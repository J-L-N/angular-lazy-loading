import { Routes } from '@angular/router';

import { NewTaskComponent, canLeaveEditPage } from '../tasks/new-task/new-task.component';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import { TasksService } from '../tasks/tasks.service';


export const routes: Routes = [
  {
    path: '',
    providers: [TasksService], //Tasks service as a provider to promote service's lazy loading
    children: [ //all the routes inserted in the children for services's lazy loading
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
      },
    ]
  },

];
