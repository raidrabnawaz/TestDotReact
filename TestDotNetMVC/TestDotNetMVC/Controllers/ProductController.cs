using Microsoft.AspNetCore.Mvc;
using TestDotNetMVC.Data;
using TestDotNetMVC.Models;

namespace TestDotNetMVC.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductRepository _repo;

        public ProductController(IProductRepository repo)
        {
            _repo = repo;
        }

        public async Task<IActionResult> Index() => View(await _repo.GetAllAsync());
        public IActionResult Create() => View();

        [HttpPost]
        public async Task<IActionResult> Create(Product product)
        {
            if (ModelState.IsValid) { await _repo.AddAsync(product); return RedirectToAction("Index"); }
            return View(product);
        }

        public async Task<IActionResult> Edit(int id) => View(await _repo.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Edit(Product product)
        {
            if (ModelState.IsValid) { await _repo.UpdateAsync(product); return RedirectToAction("Index"); }
            return View(product);
        }

        public async Task<IActionResult> Delete(int id) => View(await _repo.GetByIdAsync(id));

        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            await _repo.DeleteAsync(id);
            return RedirectToAction("Index");
        }
    }
}
