import { TranslateService } from "@ngx-translate/core";
import { AppInjector } from "./app-injector";
import { Subject } from "rxjs";

export class ComponentBase {
    
    // protected loaderCtrl: LoadingController;

    public translations = {}
    protected _translateSvc;

    private _unSubComponentBase = new Subject();

    constructor(
        protected translateKeysList: Array<string> = []
    ) {
        this._translateSvc = AppInjector.get(TranslateService);
    }

    protected async translateKeys(): Promise<Map<string, string>> {
        // do the actual translation and set on the map
        const { _translateSvc, translateKeysList } = this

        return this.translations = await _translateSvc
            .get(translateKeysList)
            .toPromise();
    }

    protected showLoader(content?: string) {
      // TODO 
    }

    protected hideLoader() {
        // TODO
    }

    protected componentBaseOnDestroy() {
        this._unSubComponentBase.next();
        this._unSubComponentBase.complete();
    }
}