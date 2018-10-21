import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { PersonalSettingsComponent } from './pages/personal-settings/personal-settings.component';
import { SingleSearchComponent } from './pages/single-search/single-search.component';
import { SearchDealsComponent } from './pages/search-deals/search-deals.component';
import { SpotUnallocatedComponent } from './pages/spot-unallocated/spot-unallocated.component';
import { DealTypeSelectionComponent } from './pages/deal-type-selection/deal-type-selection.component';
import { DealListComponent } from './pages/deal-list/deal-list.component';
import { JavaConsoleComponent } from './pages/java-console/java-console.component';

const routes: Routes = [
  { path: '', redirectTo: 'main-menu', pathMatch: 'full' },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'deal-type-selection', component: DealTypeSelectionComponent },
  { path: 'deal-type-selection/spot-unallocated', component: SpotUnallocatedComponent },
  { path: 'single-search', component: SingleSearchComponent },
  { path: 'search-deals', component: SearchDealsComponent },
  { path: 'search-deals/deal-list', component: DealListComponent },
  { path: 'personal-settings', component: PersonalSettingsComponent },
  { path: 'java-console', component: JavaConsoleComponent },
  { path: 'display', component: SpotUnallocatedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
