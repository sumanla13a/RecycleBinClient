import { RouterModule, Routes, Resolve } from '@angular/router';

import { ItemsListComponent } from './items-list/items-list.component';
import { ErrorComponent } from './error/error.component';

import { ItemListResolver } from './items-list/items.resolver';
import { AddItemComponent } from './add-item/add-item.component';
const routes: Routes = [
	{
		path:'',
		redirectTo:'home',
		pathMatch: 'full'
	}, {
		path:'home',
		component: ItemsListComponent,
		resolve: {
			items: ItemListResolver
		}
	}, {
		path: 'home/add',
		component: AddItemComponent
	}, {
		path: '404',
		component: ErrorComponent
	}, {
		path:'**',
		redirectTo:'404'
	}
];

export const RecycleBinRoutes = RouterModule.forRoot(routes);