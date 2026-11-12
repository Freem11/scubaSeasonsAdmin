import { getAnimalNamesThatFit, PhotoLabel } from '../../api/supabase/photoSupabaseCalls';
import { DynamicSelectOptions } from '../ui/dynamicSelect/DynamicSelectOptions';
import { Option } from '../ui/select';

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
