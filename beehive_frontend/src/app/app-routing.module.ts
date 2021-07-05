import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'events-card',
    loadChildren: () => import('./pages/events-card/events-card.module').then( m => m.EventsCardPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./pages/add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'group-chats',
    loadChildren: () => import('./pages/group-chats/group-chats.module').then( m => m.GroupChatsPageModule)
  },
  {
    path: 'chat/:id',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
