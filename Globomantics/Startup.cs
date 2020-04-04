using Globomantics.PowerBI.Authentication;
using Globomantics.PowerBI.Embedding;
using Globomantics.PowerBI.Interfaces;
using Globomantics.PowerBI.RowLevelSecurity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Globomantics
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // Azure AD Token Generation
            services.Configure<AzureADConfiguration>(Configuration.GetSection(nameof(AzureADConfiguration)));
            services.AddTransient<IAzureTokenGenerator, AzureTokenGenerator>();

            // Power BI - Report Embedding
            services.Configure<WorkspaceConfiguration>(Configuration.GetSection(nameof(WorkspaceConfiguration)));
            services.AddTransient<IReportEmbedding, ReportEmbedding>();

            // Power BI - Dashbard Embedding
            services.AddTransient<IDashboardEmbedding, DashboardEmbedding>();

            // Power BI - Tile Embedding
            services.AddTransient<ITileEmbedding, TileEmbedding>();

            // RLS Identity Provider
            services.AddTransient<IIdentityProvider, IdentityProvider>();

            // Tile Redirection
            services.AddTransient<ITileRedirection, TileRedirection>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=App}/{action=Index}/{id?}");
            });
        }
    }
}
