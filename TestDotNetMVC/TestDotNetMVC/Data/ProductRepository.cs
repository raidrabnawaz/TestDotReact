using TestDotNetMVC.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;

namespace TestDotNetMVC.Data
{
    public class ProductRepository : IProductRepository
    {
        /*private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllAsync() => await _context.Products.ToListAsync();
        public async Task<Product> GetByIdAsync(int id) => await _context.Products.FindAsync(id);
        public async Task AddAsync(Product product) { _context.Products.Add(product); await _context.SaveChangesAsync(); }
        public async Task UpdateAsync(Product product) { _context.Products.Update(product); await _context.SaveChangesAsync(); }
        public async Task DeleteAsync(int id) { var product = await _context.Products.FindAsync(id); if (product != null) { _context.Products.Remove(product); await _context.SaveChangesAsync(); } }
        */
        private readonly string _connectionString;

        public ProductRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        private IDbConnection Connection => new SqlConnection(_connectionString);
        public async Task<IEnumerable<Product>> GetAllAsync() => await Connection.QueryAsync<Product>("GetAllProducts");
        public async Task<Product> GetByIdAsync(int id) => await Connection.QuerySingleAsync<Product>("GetProductById", new { Id = id }, commandType: CommandType.StoredProcedure);
        public async Task AddAsync(Product product)
        {
            var parameters = new
            {
                Name = product.Name,
                Price = product.Price,
                Quantity = product.Quantity
            };

            await Connection.ExecuteAsync("InsertProduct", parameters, commandType: CommandType.StoredProcedure);
        }
        public async Task UpdateAsync(Product product) => await Connection.ExecuteAsync("UpdateProduct", product, commandType: CommandType.StoredProcedure);
        public async Task DeleteAsync(int id) => await Connection.ExecuteAsync("DeleteProduct", new { Id = id }, commandType: CommandType.StoredProcedure);

    }
}
