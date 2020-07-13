using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _07_Variables
{
    public class Identifier
    {

        private string myVariable = "Hello";

        public void DoMethod(string Name)
        {
            Console.WriteLine(Name);
            Console.WriteLine(myVariable);
        }


        /* #BadIdentifiers
        
        private string void = "Hello";

        public void catch(string @char)
        {
            Console.WriteLine(@char);
            Console.WriteLine(void);
        }

        */

    }

}
