import { getAnimalNamesThatFit, PhotoLabel } from '../apicalls/supabaseCalls/photoSupabaseCalls';
import { DynamicSelectOptions } from '../reusables/dynamicSelect/DynamicSelectOptions';
import { Option } from '../reusables/select';

export class DynamicSelectOptionsAnimals extends DynamicSelectOptions<PhotoLabel> {
  convertItem(item: PhotoLabel): Option {
    return { key: item.label, label: item.label };
  }

  static getMoreOptions(search: string) {
    return getAnimalNamesThatFit(search).then((response) => {
      return new DynamicSelectOptionsAnimals().convertHttpResponse(response);
    });
  }
}
