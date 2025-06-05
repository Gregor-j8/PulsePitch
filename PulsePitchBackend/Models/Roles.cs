namespace PulsePitch.Models;

internal sealed class Role
{
    internal const string Coach = "Coach";
    internal const string Member = "member";
    internal const int CoachId = 1;
    internal const int MemberId = 2;
    public int Id { get; init; }
    public string Name { get; init; }
}