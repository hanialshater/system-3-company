import type { FeedPage } from './feed-types';
export type FeedBookmark={tag:string;snapshot:string;ordinal:number;slug:string};
/** Only a newly validated server page may supply the successor; never reuse an unresolved private array. */
export function resumeFeedTail<T extends FeedPage>(page:T,bookmark:FeedBookmark):T&{resumeOrdinal:number}|null{
 const offset=bookmark.ordinal%30;
 if(page.page!==Math.floor(bookmark.ordinal/30)||page.items[offset]?.slug!==bookmark.slug)return null;
 return {...page,items:page.items.slice(offset+1),resumeOrdinal:bookmark.ordinal};
}
