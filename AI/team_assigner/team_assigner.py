from sklearn.cluster import KMeans
import numpy as np
class TeamAssigner:
    def __init__(self):
        self.team_colors = {}
        self.player_team_dict = {}
        self.player_color_cache = {}
        self.cache_ttl = 30

    def get_clustering_model(self, image):
        image_2d = image.reshape(-1, 3)
        kmeans = KMeans(n_clusters=2, init='k-means++', n_init=1).fit(image_2d)
        return kmeans

    def get_player_color(self, frame, bbox, player_id=None, frame_count=None):
        if player_id is not None and frame_count is not None:
            if player_id in self.player_color_cache:
                cached_frame, cached_color = self.player_color_cache[player_id]
                if frame_count - cached_frame < self.cache_ttl:
                    return cached_color

        image = frame[int(bbox[1]):int(bbox[3]), int(bbox[0]):int(bbox[2])]
        if image.size == 0:
            return np.array([0, 0, 0])

        top_half = image[:image.shape[0] // 2, :]
        kmeans = self.get_clustering_model(top_half)

        labels = kmeans.labels_
        clustered_image = labels.reshape(top_half.shape[0], top_half.shape[1])
        corner_clusters = [clustered_image[0, 0], clustered_image[0, -1], clustered_image[-1, 0], clustered_image[-1, -1]]
        non_player_color = max(set(corner_clusters), key=corner_clusters.count)
        player_cluster = 1 - non_player_color
        player_color = kmeans.cluster_centers_[player_cluster]

        if player_id is not None and frame_count is not None:
            self.player_color_cache[player_id] = (frame_count, player_color)

        return player_color

    def assign_team_color(self, frame, player_detections, frame_count):
        player_colors = []
        player_ids = []

        for player_id, data in player_detections.items():
            bbox = data['bbox']
            player_color = self.get_player_color(frame, bbox, player_id, frame_count=frame_count)
            player_colors.append(player_color)
            player_ids.append(player_id)

        if len(player_colors) < 2:
            return

        kmeans = KMeans(n_clusters=2, init='k-means++', n_init=1)
        kmeans.fit(player_colors)
        self.kmeans = kmeans

        self.team_colors[1] = kmeans.cluster_centers_[0]
        self.team_colors[2] = kmeans.cluster_centers_[1]

    def get_player_teams(self, frame, player_bbox, player_id, frame_count):
        if player_id in self.player_team_dict:
            return self.player_team_dict[player_id]

        player_color = self.get_player_color(frame, player_bbox, player_id, frame_count)

        if not hasattr(self, 'kmeans'):
            return 0

        team_id = self.kmeans.predict(player_color.reshape(1, -1))[0] + 1
        self.player_team_dict[player_id] = team_id
        return team_id