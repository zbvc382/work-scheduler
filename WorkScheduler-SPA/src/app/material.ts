import { MatButtonModule, MatCheckboxModule, MatCardModule, MatInputModule,
    MatFormFieldModule, MatTabsModule, MatListModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { NgModule } from '@angular/core';

@NgModule ({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule,
        MatListModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatTabsModule,
        MatListModule
    ]
})

export class MaterialModule {}
