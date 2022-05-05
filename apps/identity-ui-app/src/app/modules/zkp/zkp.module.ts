import { NgModule } from '@angular/core';
import { ZkpLandingPageComponent } from './components/pages/zkp-landing-page/zkp-landing-page.component';
import { ZkpLandingPageViewComponent } from './components/presentational/zkp-landing-page-view/zkp-landing-page-view.component';
import { ZkpRoutingModule } from './zkp-routing.module';
import { ZkpGenerateKeysComponent } from './components/containers/zkp-generate-keys/zkp-generate-keys.component';
import { ZkpGenerateKeysViewComponent } from './components/presentational/zkp-generate-keys-view/zkp-generate-keys-view.component';
import { SharedLibModule } from '@decentralized-freelance-news/shared-lib';
import { ZkpGenerateProofViewComponent } from './components/presentational/zkp-generate-proof-view/zkp-generate-proof-view.component';
import { ZkpGenerateProofComponent } from './components/containers/zkp-generate-proof/zkp-generate-proof.component';
import { ZkpGenerateContractComponent } from './components/containers/zkp-generate-contract/zkp-generate-contract.component';

@NgModule({
  declarations: [
    ZkpLandingPageViewComponent,
    ZkpLandingPageComponent,
    ZkpGenerateKeysViewComponent,
    ZkpGenerateKeysComponent,
    ZkpGenerateProofViewComponent,
    ZkpGenerateProofComponent,
    ZkpGenerateContractComponent,
  ],
  imports: [ZkpRoutingModule, SharedLibModule],
  providers: [],
})
export class ZkpModule {}
