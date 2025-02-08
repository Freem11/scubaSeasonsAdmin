import style from './styles.module.scss';
import { PartnerRequest } from '../../entities/partnerRequest';

type PartnerRequestListProps = {
  partnerRequestsList: PartnerRequest[] | null;
};

export default function PartnerRequestListView(props: PartnerRequestListProps) {
  return (
    <div className="mt-4 flex-column">
      {props.partnerRequestsList &&
        props.partnerRequestsList.map((record: PartnerRequest) => {
          return (
            <div className={style.cardMain} key={record.id} onClick={() => {}}>
              <div className="py-2">
                <div>{record.businessName}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
