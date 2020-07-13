using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _07_Variables
{
    class Program
    {
        public static string myVariable = "Hello";

        public static string DoMethod(string Name)
        {
            string message = "Your name is " + Name;
            return message;
        }

        public void display()
        {
            Console.WriteLine(myVariable);

            // Out of Scope
            // Console.WriteLine(message);
        }

        public static void Main(string[] args)
        {
            Console.WriteLine(myVariable);

            // Out of Scope
            // Console.WriteLine(message);
            // Do below instead
            string greeting = DoMethod("Noname");
            Console.WriteLine(greeting);

            Console.ReadKey();
        }
    }
}
