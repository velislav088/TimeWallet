using SecureWebSite.Server.Models.Enums;

namespace SecureWebSite.Server.Models.DTO_Models
{
    public class ElementEditDTO
    {
      public int Id { get; set; }
      public EditableThingsInTheElementsClass EditableThingsInTheElementsClass { get; set; }
      public string Change {  get; set; }
      
    }
}
