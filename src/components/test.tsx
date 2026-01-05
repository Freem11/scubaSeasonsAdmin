import React, { useState, useEffect } from 'react';
import { fetchAllBucketKeys } from '../apicalls/cloudflareBucketCalls/cloudflareAWSCalls';
import { 
  getSeaLifeWaitPhotoLinks,
  getSeaLifePhotoLinks,
  getDiveSiteReviewPhotoLinks,
  getProfilePhotoLinks,
  getDiveSiteHeaderPhotoLinks
} from '../apicalls/supabaseCalls/cleanupCalls';

const PUBLIC_BASE_URL = 'https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/';

const PhotoAuditTool = () => {
  const [orphans, setOrphans] = useState<string[]>([]); // In Bucket, Not in DB
  const [brokenLinks, setBrokenLinks] = useState<string[]>([]); // In DB, Not in Bucket
  const [loading, setLoading] = useState(true);

  const runAudit = async () => {
    setLoading(true);
    try {
      // 1. Fetch Cloudflare Keys
      const bucketKeys = await fetchAllBucketKeys();
      const bucketKeySet = new Set(bucketKeys.map(k => k.toLowerCase().trim()));

      // 2. Fetch all DB records concurrently
      const [seaWait, seaLife, reviews, profiles, headers] = await Promise.all([
        getSeaLifeWaitPhotoLinks(),
        getSeaLifePhotoLinks(),
        getDiveSiteReviewPhotoLinks(),
        getProfilePhotoLinks(),
        getDiveSiteHeaderPhotoLinks()
      ]);

      // 3. Extract and normalize DB keys
      const rawDbResults = [...seaWait, ...seaLife, ...reviews, ...profiles, ...headers].flat(Infinity);
      
      const dbKeys = rawDbResults.map((item: any) => {
        const url = item.photoFile || item.photoPath || item.profilePhoto || item.diveSiteProfilePhoto || "";
        // Clean the URL to get the raw filename
        return decodeURIComponent(url)
          .split("/")
          .pop()
          ?.replace(/[^a-z0-9._-]/gi, '')
          .toLowerCase()
          .trim();
      }).filter(k => k && k !== "");

      const dbKeySet = new Set(dbKeys);

      // --- SCENARIO A: In Bucket, NOT in DB (Orphans) ---
      const orphanedFiles = bucketKeys.filter(key => !dbKeySet.has(key.toLowerCase().trim()));

      // --- SCENARIO B: In DB, NOT in Bucket (Broken Links) ---
      const missingFiles = dbKeys.filter(key => !bucketKeySet.has(key));

      setOrphans(orphanedFiles);
      setBrokenLinks(missingFiles);
    } catch (err) {
      console.error("Audit failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAudit();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Running deep audit on ~1,600+ records...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1>Data Integrity Audit</h1>
      <button onClick={runAudit} style={{ padding: '10px 20px', cursor: 'pointer' }}>Re-run Audit</button>

      <hr style={{ margin: '30px 0' }} />

      {/* SECTION 1: ORPHANS */}
      <section>
        <h2 style={{ color: '#d9534f' }}>1. Orphaned Files ({orphans.length})</h2>
        <p>These files exist in <strong>Cloudflare R2</strong> but have no reference in <strong>Supabase</strong>. (Safe to delete?)</p>
        <div style={gridStyle}>
          {orphans.map((key) => (
            <div key={`orphan-${key}`} style={cardStyle}>
              <img src={`${PUBLIC_BASE_URL}${key}`} alt="orphan" style={imgStyle} />
              <p style={labelStyle}>{key}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ margin: '50px 0' }} />

      {/* SECTION 2: BROKEN LINKS */}
      <section>
        <h2 style={{ color: '#f0ad4e' }}>2. Broken Database Records ({brokenLinks.length})</h2>
        <p>These filenames are in your <strong>Supabase</strong> tables, but the files are missing from <strong>Cloudflare</strong>.</p>
        <div style={gridStyle}>
          {brokenLinks.map((key, index) => (
            <div key={`broken-${key}-${index}`} style={{ ...cardStyle, backgroundColor: '#fff0f0', borderColor: '#ffcccc' }}>
               <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cc0000', fontSize: '12px', textAlign: 'center' }}>
                 File Missing in Bucket
               </div>
               <p style={labelStyle}>{key}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Simple Styles
const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: '15px',
  marginTop: '20px'
};

const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '4px'
};

const labelStyle: React.CSSProperties = {
  fontSize: '10px',
  wordBreak: 'break-all',
  marginTop: '8px',
  color: '#444'
};

export default PhotoAuditTool;