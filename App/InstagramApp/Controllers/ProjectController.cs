using Microsoft.AspNetCore.Mvc;
using InstagramApp.DataAccess.Interfaces;
using InstagramApp.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InstagramApp.Controllers
{
    public class ProjectController : Controller
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Project>> GetAll()
        {
            var result =  await _projectRepository.GetListAsync();
            return result;
        }

        [HttpGet]
        public async Task<Project> GetById(Guid id)
        {
            return await _projectRepository.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<Project> Create([FromBody]Project project)
        {
            await _projectRepository.SaveOrUpdateAsync(project);
            return project;
        }

        [HttpPut]
        public async Task<Project> Update(Project project)
        {
            await _projectRepository.SaveOrUpdateAsync(project);
            return project;
        }

        [HttpDelete]
        public async Task Delete(Project project)
        {
            await _projectRepository.DeleteByIdAsync(project.Id);
        }
    }
}
