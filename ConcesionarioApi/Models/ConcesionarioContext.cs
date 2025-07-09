using System;
using Microsoft.EntityFrameworkCore;

namespace ConcesionarioApi.Models
{
    public partial class ConcesionarioContext : DbContext
    {
        public ConcesionarioContext() { }

        public ConcesionarioContext(DbContextOptions<ConcesionarioContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Prueba> Pruebas { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Vehiculo> Vehiculos { get; set; }
        public DbSet<ReglaPrecio> ReglaPrecio { get; set; }
        public DbSet<Publicacion> Publicaciones { get; set; }
        public DbSet<Venta> Ventas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración para Prueba
            modelBuilder.Entity<Prueba>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("pruebas");

                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombre)
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("nombre");
            });

            base.OnModelCreating(modelBuilder);

            // Cliente
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasIndex(v => v.Documento)
                      .IsUnique();
                entity.Property(c => c.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");
            });

            // Vehiculo

            modelBuilder.Entity<Vehiculo>(entity =>
            {
                entity.HasIndex(v => v.Modelo)
                      .IsUnique();
                entity.Property(v => v.FechaCreacion)
                      .HasDefaultValueSql("GETDATE()");
            });

            // ReglaPrecio
            modelBuilder.Entity<ReglaPrecio>(entity =>
            {
                entity.HasIndex(r => r.VehiculoId)
                    .IsUnique();
                entity.Property(r => r.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");
            });

            // Publicacion
            modelBuilder.Entity<Publicacion>()
                .Property(p => p.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");

            // Venta
            modelBuilder.Entity<Venta>(entity =>
            {
                entity.HasIndex(v => v.PublicacionId)
               .IsUnique();
                entity.Property(v => v.FechaCreacion)
                .HasDefaultValueSql("GETDATE()");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
