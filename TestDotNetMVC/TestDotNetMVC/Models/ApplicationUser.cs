using Microsoft.AspNetCore.Identity;

namespace TestDotNetMVC.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}
