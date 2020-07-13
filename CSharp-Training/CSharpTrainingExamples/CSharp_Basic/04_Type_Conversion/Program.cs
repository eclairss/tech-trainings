using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _04_Type_Conversion
{
    class Program
    {
        static void Main(string[] args)
        {
            int i = 75;
            float f = 53.005f;
            double d = 2345.7652;
            bool b = true;

            //string conversion
            Console.WriteLine(i.ToString());
            Console.WriteLine(f.ToString());
            Console.WriteLine(d.ToString());
            Console.WriteLine(b.ToString());
            Console.ReadKey();

            //other conversions
            string isValid = "false";
            string numeric = "123";
            string oneLetter = "A";

            bool toBool = bool.Parse(isValid);
            int toInteger = int.Parse(numeric);
            char toChar = char.Parse(oneLetter);

        }
    }
}
