import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '../../admin-dashboard/admin-dashboard.component';
import { InterestingPointComponent } from '../../interesting-point/interesting-point.component';
import { InterestingPointResolver } from '../../resolvers/interestingPointResolver.resolver';
import { UserGamesResolverResolver } from '../../../user/resolvers/userGamesResolver.resolver';
import { GamesComponent } from '../../games/games.component';

export const ADMIN_FULL_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/admin/dashboard' },
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'interestingPoint', component: InterestingPointComponent, resolve: { interestingPoint: InterestingPointResolver } },
  { path: 'games', component: GamesComponent, resolve: {games: UserGamesResolverResolver} },
];
