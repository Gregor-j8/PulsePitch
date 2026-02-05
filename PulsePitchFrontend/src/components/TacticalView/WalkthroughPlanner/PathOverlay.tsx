import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { WalkthroughTimeline, PathType } from '../../../types';

interface PathOverlayProps {
  timeline: WalkthroughTimeline;
  width: number;
  height: number;
  referenceWidth: number;
  referenceHeight: number;
  showPaths: boolean;
  onKeyframeDrag?: (playerId: number, keyframeIndex: number, newX: number, newY: number) => void;
  onKeyframeDragEnd?: () => void;
}

export const PathOverlay = ({
  timeline,
  width,
  height,
  referenceWidth,
  referenceHeight,
  showPaths,
  onKeyframeDrag,
  onKeyframeDragEnd,
}: PathOverlayProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const scaleX = (x: number) => (x / referenceWidth) * width;
  const scaleY = (y: number) => (y / referenceHeight) * height;
  const unscaleX = (x: number) => (x / width) * referenceWidth;
  const unscaleY = (y: number) => (y / height) * referenceHeight;

  useEffect(() => {
    if (!svgRef.current || !showPaths) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Define arrowhead marker
    const defs = svg.append('defs');

    Object.entries(timeline.players).forEach(([playerId, playerWalkthrough]) => {
      if (playerWalkthrough.keyframes.length < 2) return;

      const color = playerWalkthrough.color || '#3B82F6';

      // Create unique marker for this player
      defs.append('marker')
        .attr('id', `arrowhead-${playerId}`)
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 8)
        .attr('refY', 5)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .attr('fill', color);
    });

    // Draw player paths
    Object.entries(timeline.players).forEach(([playerId, playerWalkthrough]) => {
      if (playerWalkthrough.keyframes.length < 2) return;

      const color = playerWalkthrough.color || '#3B82F6';
      const pathType = playerWalkthrough.pathType as PathType;

      // Scale keyframes to current dimensions
      const scaledKeyframes = playerWalkthrough.keyframes.map(kf => ({
        x: scaleX(kf.x),
        y: scaleY(kf.y),
      }));

      // Line generator
      let lineGenerator: d3.Line<{ x: number; y: number }>;

      if (pathType === 'curved') {
        lineGenerator = d3.line<{ x: number; y: number }>()
          .curve(d3.curveCatmullRom)
          .x(d => d.x)
          .y(d => d.y);
      } else {
        lineGenerator = d3.line<{ x: number; y: number }>()
          .curve(d3.curveLinear)
          .x(d => d.x)
          .y(d => d.y);
      }

      // Draw path
      svg.append('path')
        .datum(scaledKeyframes)
        .attr('class', 'player-path')
        .attr('d', lineGenerator)
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('stroke-dasharray', pathType === 'dashed' ? '5,5' : '0')
        .attr('marker-end', `url(#arrowhead-${playerId})`)
        .attr('opacity', 0.7);

      // Draw keyframe markers
      playerWalkthrough.keyframes.forEach((kf, kfIdx) => {
        const marker = svg.append('circle')
          .attr('class', 'keyframe-marker')
          .attr('cx', scaleX(kf.x))
          .attr('cy', scaleY(kf.y))
          .attr('r', 6)
          .attr('fill', color)
          .attr('stroke', '#FFFFFF')
          .attr('stroke-width', 2)
          .style('cursor', 'move');

        if (onKeyframeDrag) {
          const drag = d3.drag<SVGCircleElement, unknown>()
            .on('drag', (event) => {
              const newX = unscaleX(event.x);
              const newY = unscaleY(event.y);
              onKeyframeDrag(Number(playerId), kfIdx, newX, newY);
            })
            .on('end', () => {
              if (onKeyframeDragEnd) onKeyframeDragEnd();
            });

          marker.call(drag);
        }
      });
    });

    // Draw ball path
    if (timeline.ball.keyframes.length >= 2) {
      const scaledKeyframes = timeline.ball.keyframes.map(kf => ({
        x: scaleX(kf.x),
        y: scaleY(kf.y),
      }));

      const lineGenerator = d3.line<{ x: number; y: number }>()
        .curve(d3.curveLinear)
        .x(d => d.x)
        .y(d => d.y);

      svg.append('path')
        .datum(scaledKeyframes)
        .attr('class', 'ball-path')
        .attr('d', lineGenerator)
        .attr('stroke', timeline.ball.pathColor)
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('stroke-dasharray', '3,3')
        .attr('opacity', 0.8);

      // Draw ball keyframe markers
      timeline.ball.keyframes.forEach((kf) => {
        svg.append('circle')
          .attr('class', 'ball-keyframe-marker')
          .attr('cx', scaleX(kf.x))
          .attr('cy', scaleY(kf.y))
          .attr('r', 5)
          .attr('fill', timeline.ball.pathColor)
          .attr('stroke', '#000000')
          .attr('stroke-width', 1);
      });
    }
  }, [timeline, width, height, referenceWidth, referenceHeight, showPaths, onKeyframeDrag, onKeyframeDragEnd]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="absolute top-0 left-0 pointer-events-auto"
      style={{ zIndex: 10 }}
    />
  );
};
