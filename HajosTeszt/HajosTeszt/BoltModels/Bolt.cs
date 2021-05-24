using System;
using System.Collections.Generic;

#nullable disable

namespace HajosTeszt.BoltModels
{
    public partial class Bolt
    {
        public short SorszamSk { get; set; }
        public string Nev { get; set; }
        public string Helyseg { get; set; }
        public string Cim { get; set; }
        public decimal Telefon { get; set; }
        public string Email { get; set; }
        public string Weblap { get; set; }
    }
}
