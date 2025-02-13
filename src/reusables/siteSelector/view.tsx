import React from 'react';
import './style.scss';
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
      <div className="siteSelector">
        {props.sites === null && (
          <div className="loadingState"><Loader /></div>
        )}

        {props.sites !== null && props.sites.length === 0 && (
          <EmptyState
            visual={(
              <div className="emptyStateIcons">
                <Icon name="anchor" className="emptyStateIconLeft" />
                <Icon name="anchor" className="emptyStateIcon" />
                <Icon name="anchor" className="emptyStateIconRight" />
              </div>
            )}
            text="No dive sites yet."
            error={props.error}
          />
        )}

        {props.sites !== null && props.sites.length > 0 && (
          <div className="siteList">
            {props.sites.map(site => (
              <div key={site.id} className="site">
                <div className="siteLeft">
                  <Icon name="check-bold" />
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
