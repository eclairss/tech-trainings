using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _02_DataTypes
{
    class Program
    {
        //** VALUE TYPES */
        bool IsTrueOrFalse = true;      //Boolean value
        byte ByteData = 255;            //8-bit unsigned integer
        char OneChar = 'A';             //16-bit Unicode character
        decimal Pi = 3.14162443M;       //128-bit precise decimal values with 28-29 significant digits
        double Ratio = 100000.9234D;    //64-bit double-precision floating point type
        float ExamScore = 99.9F;        //32-bit single-precision floating point type
        int RecordCount = 3000;         //32-bit signed integer type
        long Distance = 23123123456;    //64-bit signed integer type
        short DayOfMonth = 30;          //16-bit signed integer type

        //** REFERENCE TYPES - object | dynamic | string | pointer */
        object obj;                     //OBJECT - ultimate base class for all data types
                                        //** BOXING - value type is converted to object type
                                        //** UNBOXING - value type is converted to object type
                                        //UNBOXING EXAMPLE: obj = 100;
        dynamic d = 20;                 //similar to OBJECT but dynamic type variables takes place at run time
        string Quoted = "I am a Message.";      //STRING - any string values
        string AtQuoted = @"I am a Message.";
        //char* cptr;                             //POINTER - store the memory address of another type
        //int* iptr;

        //** CUSTOM DATATYPES */
        Person Me = new Person();       //Person is the class I created

        static void Main(string[] args)
        {
            // sizeof(datatype) returns allocated memory size to that data type
            Console.WriteLine("Size of int: {0}", sizeof(int));
            Console.ReadLine();
        }
    }
}
