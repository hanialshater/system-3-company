/** Ownership must settle before even the first local history read; anonymous/off uses the same boundary. */
export function readOwnedProgress<T>(ownershipReady:boolean,read:()=>T):T|null{
 return ownershipReady?read():null;
}
