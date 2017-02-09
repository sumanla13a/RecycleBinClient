import { RouterModule, Routes, Resolve } from '@angular/router';

import { ItemsListComponent } from './items-list/items-list.component';
import { ErrorComponent } from './error/error.component';

import { ItemListResolver } from './items-list/items.resolver';
import { AddItemComponent } from './add-item/add-item.component';

import { AddItemCanActivate } from './add-item/add-item.guard';
import { SingleItemComponent } from './single-item/single-item.component';
import { SingleItemResolver } from './single-item/single-item.resolver';

import {UploadImageComponent} from './upload-image/upload-image.component';

import { UpdateItemComponent } from './update-item/update-item.component';
const routes: Routes = [
	{
		path:'',
		redirectTo:'items',
		pathMatch: 'full'
	}, {
		path:'items',
		component: ItemsListComponent,
		resolve: {
			items: ItemListResolver
		}
	}, {
		path: 'items/add',
		component: AddItemComponent,
		canActivate: [AddItemCanActivate]
	},{
		path: 'items/:id',
		component: SingleItemComponent,
		resolve: {
			item: SingleItemResolver
		}
	}, {
		path: 'items/update/:id',
		component: UpdateItemComponent,
		resolve: {
			item: SingleItemResolver
		}
	}, {
		path: 'upload',
		component: UploadImageComponent
	}, {
		path: '404',
		component: ErrorComponent
	}, {
		path:'**',
		redirectTo:'404'
	}
];

export const RecycleBinRoutes = RouterModule.forRoot(routes);