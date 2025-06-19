namespace PulsePitch.DTO;

public class FormationsDTO
{
    public string Name { get; set; }
    public int Id { get; set; }

    public int TeamId { get; set; }

    public TeamDTO? Team { get; set; }

    public List<PlayersInFormationDTO> Players { get; set; }
}
