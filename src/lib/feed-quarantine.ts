import type { FeedSlot } from './feed-sequence';
/** A neutral public interaction only: no saved choices, private neighbours, reasons or paging retained. */
export function quarantinedSlots(current:FeedSlot|null):FeedSlot[]{
 return current&&current.kind!=='intro'?[{kind:'intro',key:'intro'},current]:[{kind:'intro',key:'intro'}];
}
export function canResumeInteraction(expected:{tag:string;snapshot:string}|null,tag:string,snapshot:string):boolean{
 return !!expected&&expected.tag===tag&&expected.snapshot===snapshot;
}
/** A transport rejection has the same private withdrawal boundary as an HTTP error. */
export function feedRequestFailed(isPrivate:boolean,withdraw:()=>void,publicFailure:()=>void):void{
 if(isPrivate)withdraw();else publicFailure();
}
