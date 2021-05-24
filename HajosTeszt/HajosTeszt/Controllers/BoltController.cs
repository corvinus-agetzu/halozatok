using HajosTeszt.BoltModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/bolt")]
    [ApiController]
    public class BoltController : ControllerBase
    {
        [HttpGet]
        //listázza az összes rekordot
        public ActionResult M1()
        {
            webshopContext context = new webshopContext();
            var adatok = from x in context.Bolts select x;
            return new JsonResult(adatok);
        }

        //listázza az adott sorszam kulcsú rekordot
        [HttpGet("{sorszam}")]
        public ActionResult M2(int sorszam)
        {
            webshopContext context = new webshopContext();
            var adat = (from x in context.Bolts
                        where x.SorszamSk == sorszam
                        select x);

            if (adat == null) return BadRequest("Nincs ilyen sorszámú adat");

            return new JsonResult(adat);
        }

        //megadja az összes rekord számát
        [HttpGet]
        [Route("count")]
        public int M3()
        {
            webshopContext context = new webshopContext();
            int adatokSzama = context.Bolts.Count();

            return adatokSzama;
        }



        // törli az adott kulcsú rekordot
        [HttpDelete("{sorszam}")]
        public string M5(int sorszam)
        {
            webshopContext context = new webshopContext();
            var adat = (from x in context.Bolts
                        where x.SorszamSk == sorszam
                        select x).FirstOrDefault();

            if (adat == null) return "Nincs ilyen sorszámú adat";

            context.Bolts.Remove(adat);
            context.SaveChanges();
            return "sikerült";
        }

        //hozzáad egy rekordot
        [HttpPost]
        public void Post([FromBody] Bolt ujelem)
        {
            webshopContext context = new webshopContext();
            context.Bolts.Add(ujelem);
            context.SaveChanges();

        }

    }


}
