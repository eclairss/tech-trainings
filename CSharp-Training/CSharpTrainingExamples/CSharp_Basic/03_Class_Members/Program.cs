using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _03_ClassMembers
{
    class ExampleClass
    {
        public bool IsValid;
        public string Text;
        public int Number;
        public float Average;

        public string GetText()
        {
            return Text;
        }

        public bool CheckIfValid()
        {
            return IsValid;
        }

        public void SetAverage(float Score1, float Score2)
        {
            Average = (Score1 + Score2) / 2;
        }

        public void RandomGreeting(string name)
        {
            Console.Write("Hello " + name);
        }

        public int MultiplyWithNumber(int YourNumber)
        {
            int Product = Number * YourNumber;
            return Product;
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            //Instantiating a class
            ExampleClass exampleObj;

            //Initializing an object
            exampleObj = new ExampleClass();

            //Instantiate and initialize in one line
            ExampleClass anotherExampleObj = new ExampleClass();

            //** ATTRIBUTES */
            //Setting Attributes of the ExampleClass object
            anotherExampleObj.IsValid = true;
            anotherExampleObj.Number = 10;
            anotherExampleObj.Average = 99.9F;
            anotherExampleObj.Text = "Hello from me!";

            //Retrieving value of the  Attributes of the ExampleClass object
            bool IsValidLocal = anotherExampleObj.IsValid;
            int NumberLocal = anotherExampleObj.Number;
            float ScoreLocat = anotherExampleObj.Average;
            string TextLocal = anotherExampleObj.Text;

            //** METHODS */
            //Using class methods of the ExampleClass object
            anotherExampleObj.RandomGreeting("YourName"); //void
            string ReturnText = anotherExampleObj.GetText();
            int Product = anotherExampleObj.MultiplyWithNumber(2);
            anotherExampleObj.SetAverage(23.3F, 98.12F); //void
            bool IsValidResult = anotherExampleObj.CheckIfValid();

            Console.ReadKey();
        }
    }
}
