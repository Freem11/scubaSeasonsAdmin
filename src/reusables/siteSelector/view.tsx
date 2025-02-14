import React from 'react';
import style from './style.module.scss';
import Icon from '../../icons/Icon';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import EmptyState from '../emptyState';
import Loader from '../loader';

type SiteSelectorViewProps = {
  sites: DiveSiteWithUserName[] | null
  error: boolean
};

export default function SiteSelectorView(props: SiteSelectorViewProps) {
  return (
    <>
      <div className={style.siteSelector}>
        {props.sites === null && (
          <div className={style.loadingState}><Loader /></div>
        )}

        {props.sites !== null && props.sites.length === 0 && (
          <EmptyState
            visual={(
              <div className={style.emptyStateIcons}>
                <Icon name="anchor" className={style.emptyStateIconLeft} />
                <Icon name="anchor" className={style.emptyStateIcon} />
                <Icon name="anchor" className={style.emptyStateIconRight} />
              </div>
            )}
            text="No dive sites yet."
            error={props.error}
          />
        )}

        {props.sites !== null && props.sites.length > 0 && (
          <div className={style.siteList}>
            {props.sites.map(site => (
              <div key={site.id} className={style.site}>
                <div className={style.siteName}>
                  <Icon name="check-bold" width="30"
                  height="30"
                  style={{ 
                    cursor: 'pointer',
                    display: 'inline', // Ensure it's not hidden
                    overflow: 'visible' // Allow the icon to render fully
                  }}/>
                  <span>{site.name}</span>
                </div>
               
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
}
