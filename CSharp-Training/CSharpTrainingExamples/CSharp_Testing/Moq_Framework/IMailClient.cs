namespace Moq_Framework
{
    public interface IMailClient
    {
        string Server { get; set; }
        string Port { get; set; }

        bool SendMail(string from, string to, string subject, string body);
    }
}