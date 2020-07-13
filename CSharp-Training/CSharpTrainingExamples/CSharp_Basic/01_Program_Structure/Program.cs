/** USING - used for including the namespaces (so you can use their classes!) in the program */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/** NAMESPACE DECLARATION */
namespace CSharp_Basic
{
    /** CLASS */
    class Program
    {
        /** CLASS ATTRIBUTES + CLASS METHODS = CLASS MEMBERS */ 

        /** CLASS ATTRIBUTES - Message | Count */
        string Message;
        int Count;

        /** CLASS METHODS - ShowMessage() | Main(string[] args) */
        void ShowMessage()
        {
            Console.WriteLine("Good Bye.");
        }

        /** MAIN METHOD .. A special kind of method */
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            Console.ReadKey();
        }
    }
}
