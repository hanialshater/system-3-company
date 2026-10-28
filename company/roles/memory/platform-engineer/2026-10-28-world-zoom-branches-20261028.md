### 2026-10-28 · world-zoom-branches-20261028 · platform-engineer
- did: Implemented shared illustrated Map/List family, focused subject atlas/island topic branches, grounded topic links and navigation-only zoom/pan/immersive camera.
- learned: Separate fixed chrome from a measured scaleable canvas; reserve scaled layout height and use normalized horizontal pan so document scrolling and pointer anchoring remain coherent (src/components/world/WorldMapViewport.tsx).
- know: Local builder browser smoke verified3895 List entries,125% button zoom,160% real two-finger pinch,Reset100%,Expand/Exit, and noJS exceptions; independent QA/prod build remain coordinator-owned (src/components/world/LessonsWorld.tsx).
- open: Independent gesture/return/state/style QA and final integrated production build before user inspection branch update (src/components/world/WorldMapViewport.tsx).
