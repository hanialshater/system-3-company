# Life Hacks scope: the research lens

author: research-scientist (Dario) · written 2026-10-14 · question: what do WikiHow and Mawdoo3 cover, and what do people actually search for in how-to content (English and Arabic)? · status: research note, not a brief. The category manager (cm-lifehacks) owns the scope decision.

## How this was gathered, and its limits (read this first)

- Web search only. Every direct fetch failed from this sandbox: wikihow.com, mawdoo3.com, web.archive.org, wikipedia.org, arxiv.org, blog.google, ahrefs.com and huggingface.co all returned "unable to fetch", a DNS failure or a proxy 403. **I did not read either site's live category pages.** The findings below come from search-result summaries of third-party pages, plus things I recalled.
- Labels used throughout: **[web]** = taken from a search result whose URL is cited; **[memory]** = recalled from training data, not checked this session; **[inference]** = my own reasoning from the other two.
- Confidence: **high** = several independent sources agree; **medium** = one credible source, or a dated one; **low** = memory only, or a weak source.
- **Before anyone treats a category list or count here as final**, someone with working network access needs to open `https://www.wikihow.com/Special:CategoryListing` and `https://mawdoo3.com/` directly and check it. That should go on the research lead's board.

## 1. WikiHow

### Size
| Finding | Source | Confidence |
|---|---|---|
| More than 235,000 how-to articles and more than 2.5M registered users, as of Dec 2021 | [web] Wikipedia "WikiHow", via search summary: https://en.wikipedia.org/wiki/WikiHow | medium (dated) |
| More than 190,000 articles in Aug 2017 | [web] https://www.my-mooc.com/en/conceptor/wiki-how/?page=2 | medium (dated; consistent with growth) |
| About half a million how-to articles across languages | [web] Lyu, Zhang & Callison-Burch, INLG 2021, https://arxiv.org/abs/2107.13189 | medium |
| An EMNLP 2020 corpus scraped 112,505 English articles. Per-category counts are in its Appendix B, which I could not open | [web] https://arxiv.org/pdf/2009.07690 | high for the total; per-category numbers **not obtained** |
| 59.42M visits in May 2025 (Semrush estimate) | [web] https://cw.semrush.com/website/wikihow.com/overview | medium (third-party estimate) |

### Top-level categories (19 topic categories)
A search over a wikiHow main-page mirror found a "Browse by Category" menu: 23 entries, of which 4 are site features (Forums, Fun Games, Quizzes, Trending), leaving 19 topic categories [web: mirror at https://backiee.wasmer.app/http_www_wikihow_com/Main-Page; the 19 is my tally of that summary]. A teacher-resource summary lists an older version of the same set with slightly different labels [web: https://www.klascement.net/websites/56548/wikihow-verzameling-van-stappenplannen]. The full names below are **[memory]**, and they agree with both sources wherever those sources name a category. Confidence: **medium-high** for the set, **medium** for the exact labels.

1. Arts and Entertainment
2. Cars & Other Vehicles
3. Computers and Electronics
4. Education and Communications
5. Family Life
6. Finance and Business
7. Food and Entertaining
8. Health
9. Hobbies and Crafts
10. Holidays and Traditions
11. Home and Garden
12. Personal Care and Style
13. Pets and Animals
14. Philosophy and Religion
15. Relationships
16. Sports and Fitness
17. Travel
18. Work World
19. Youth

### Second-level categories (life-hacks-relevant branches only)
These are all **[memory], low-medium confidence**, except where marked. I could not reach any category page to check them.
- **Home and Garden**: Housekeeping (cleaning, laundry, organizing, stain removal), Home Repair and Maintenance, Gardening, Pest Control, Home Decorating, Moving House, Home Safety, Swimming Pools and Spas, Sustainable Living.
- **Food and Entertaining**: Recipes, Cooking Techniques, Drinks (confirmed: a 2023 Kiwix mirror has a "Category:Drinks", [web] https://kiwix.lema.org/wikihow_en_maxi_2023-03/Category:Drinks), Food Preservation / storage, Kitchen Tools, Parties/Entertaining.
- **Computers and Electronics**: Computers (Windows, Mac), Phones and Smartphones (iPhone, Android), Internet and social media, Software, Hardware, Consumer Electronics, Video Games.
- **Personal Care and Style**: Hair Care, Skin Care, Fashion / Clothing, Makeup, Personal Hygiene.
- **Education and Communications**: Studying, Writing, Speaking, Mathematics, Science, Languages, Social Interactions.
- **Finance and Business**: Managing Your Money, Budgeting, Taxes, Shopping, Careers / Job Search.
- **Health**: Conditions and Treatments, Mental Health, Nutrition and Lifestyle, Women's/Men's Health, First Aid, Sleep.
- **Travel**: Packing, Air Travel, Trip Planning.
- **Cars & Other Vehicles**: Car Maintenance, Driving, Bicycles.

**Per-category article counts: not obtained.** My unchecked impression **[memory, low]** is that Computers and Electronics, Health, and Relationships are among the largest categories, and Holidays and Youth among the smallest. Do not cite this. The way to get real numbers is Appendix B of arXiv 2009.07690, or a per-category count from the public wikiHow dataset.

## 2. Mawdoo3 (موضوع)

### Size and audience
| Finding | Source | Confidence |
|---|---|---|
| Founded 2010 in Jordan by Mohammad Jaber and Rami Al Qawasmi. Publishes original informational articles; does not publish opinion, news or promotional pieces | [web] https://www.wikipedia.com/wiki/Mawdoo3 ; https://www.arabnet.me/english/editorials/entrepreneurship/investment/world-s-largest-arabic-web-encyclopedia-gets--1-5m-investment | high |
| About 150,000 articles (2018); more than 130,000 (2017); publishing about 5,000 articles a month (2017) | [web] https://www.wamda.com/en/2018/07/arabic-content-platform-mawdoo3-raises-135m-british-american-vcs ; https://egyptianstreets.com/2017/11/28/mawdoo3-the-largest-online-arabic-content-platform-is-one-click-away/ ; https://www.wamda.com/en/2017/04/Mawdoo3-scales-video-AI | medium (dated) |
| More than 45M unique users a month (2018, company claim) | [web] Wamda 2018, above | low-medium (self-reported) |
| No. 1 MENA site in a Forbes ranking on 2021 data, 269.5M visits | [web] https://al3omk.com/?p=719176 | medium |
| Semrush estimate: 5.69M visits in Oct 2025, 58% from Google organic; top audiences in Egypt, then Saudi Arabia, then Algeria | [web] https://cw.semrush.com/website/mawdoo3.com/overview | medium. The drop from 2021 is large; it may reflect a methodology difference or a real traffic loss to AI answers. Unresolved |
| No. 2 reference site in Saudi Arabia by organic traffic (after Wikipedia), Jul 2025 | [web] https://ahrefs.com/websites/saudi-arabia/reference | medium |

### Top categories
I could not open the site's navigation. Third-party descriptions of its topics, all **[web]**:
- health, business, religion, advice, beauty, cooking: https://jordantimes.com/node/278086
- lifestyle, health, education, food: Wamda 2018, above
- arts, self-care, finance, technology, earth sciences, nutrition, Islamic studies: https://tracxn.com/d/companies/mawdoo3/__85pIH9-Z1ooUMt8XkILK0fm5JuuEbav2Sh_ZKMoOgrE
- nutrition, health, cooking, self-care: https://www.zoominfo.com/c/mawdoo3/369232122

My recalled navigation, **[memory], low confidence; check before use**: صحة (health), مطبخ / طبخ (cooking), تغذية (nutrition), جمال / عناية بالنفس (beauty, self-care), إسلام (Islam), تعليم (education), تقنية / حاسوب وإنترنت (tech), مال وأعمال (money and business), علوم / علوم الأرض (sciences), حيوانات ونباتات (animals and plants), سياحة وسفر (travel), أدب وشعر (literature and poetry), فنون (arts), تاريخ وحضارات (history), جغرافيا / دول (countries), أسرة وتربية (family and parenting), رياضة (sport), قانون (law).

**[inference, medium]** Mawdoo3 is shaped more like an encyclopedia than a how-to site. A large share of its articles are "what is X" or "research paper on X" (بحث عن…) pieces, plus religion and poetry. Its how-to core is cooking (طريقة عمل…), health and beauty, and education and study.

## 3. What people actually search for in how-to content

### English
| Finding | Source | Confidence |
|---|---|---|
| "How to…" searches grew more than 140% from 2004 to the late 2010s, and "much of that search interest is directed towards how to 'fix' things" (Google data editor) | [web] https://technology.inquirer.net/?p=66662 ; https://www.searchenginejournal.com/googles-year-search-top-queries-2017/227639 | medium (dated) |
| 2025: queries starting "How do I…" hit an all-time high, up 25% year on year | [web] https://blog.google/products/search/year-in-search-2025/ | medium-high (Google's own claim) |
| "How" questions are 44% of question-form searches ("What" 28%) in a 2025 Semrush analysis of more than 4B terms | [web] https://ekantipur.com/technology/2025/12/17/en/the-style-of-asking-questions-on-the-internet-has-changed-52-56.html | medium |
| Ahrefs' top Google questions (US, undated) include how-to queries on invoices, voting registration, starting a blog, budgeting, changing a tire, learning JavaScript and taking a Mac screenshot | [web] https://ahrefs.com/blog/top-google-questions/ | medium |
| Yearly top how-tos are dominated by news-driven spikes: slime, eclipse glasses, bitcoin, freezing credit, screen recording, losing belly fat (2017); registering to vote (2018); Pokémon Go (2016) | [web] https://blog.google/products/search/year-in-search-2017/ ; https://9to5google.com/2018/12/12/google-year-in-search-2018/ ; https://www.digitaltrends.com/web/google-2016-year-in-search/ | high |
| Perennial how-tos: tie a tie, kiss, make pancakes, write a cover letter | [web] undated list in the same search set | low |

**[inference, medium] The durable demand clusters in English** (perennials, not yearly spikes): (1) tech and phone tasks (screenshots, screen recording, settings); (2) cooking basics and recipes; (3) fixing things at home and on the car (the "fix" trend, changing a tire); (4) money admin (budgeting, invoices, credit); (5) body and appearance (weight, skin, hair; much of it falls on our refuse list); (6) relationships and social skills; (7) study, writing and careers (cover letters, learning to code); (8) clothing and dressing (tie a tie).

### Arabic
| Finding | Source | Confidence |
|---|---|---|
| Google's MENA Year in Search lists exist for 2020 to 2025, but the summaries I could see showed no "كيف" (how-to) list, only trending topics (sport, AI tools, exam results, exchange rates, zakat) | [web] https://blog.google/intl/ar-mena/products/explore-get-answers/google-year-in-search-mena-2024-arabic/ ; https://blog.google/intl/ar-mena/company-news/inside-google/year-in-search-mena-2025/ ; https://blog.google/intl/ar-mena/products/explore-get-answers/2021-year-in-search/ ; https://trends.withgoogle.com/year-in-search/2025/eg/ | high that the lists exist; **how-to demand not obtained** |
| A 2020 article lists the most-searched questions in Arab countries (not opened) | [web] https://shafaq.com/ar/منوعـات/كثر-ال-س-لة-بحثا-على-جوجل-2020-في-الدول-العربية | unread |
| Seasonal religious practice is a large search driver: zakat searches in Saudi Arabia hit their highest level since 2011 (2021) | [web] Google MENA 2021, above | medium |
| Exams are a large search driver (Egypt's Thanaweya Amma results, Saudi Qiyas centre, 2025) | [web] Google MENA 2025, above ; https://www.masrawy.com/news/tech-reports/details/2025/12/4/2901856/ | medium |
| An academic study of Arab-country Google queries (2004 to 2009) found entertainment, recreation and computers/internet dominate, and users favour native-language queries | [web] https://augusta.elsevierpure.com/en/publications/examining-web-search-trends-across-arab-countries/ | medium (old) |

**[memory + inference, low-medium] Arabic how-to demand clusters:** (1) recipes (طريقة عمل… is plausibly the largest single Arabic how-to stem; this is memory and must be checked in Google Trends / Keyword Planner for EG and SA); (2) religious practice (صلاة, وضوء, زكاة; out of our scope, see below); (3) beauty and self-care (تبييض, تطويل الشعر; mostly on the refuse list); (4) health and diet (رجيم; refuse list); (5) study and exams (طريقة المذاكرة, تنظيم الوقت); (6) phone and app tasks (كيف أسترجع حساب, تحميل…); (7) home cleaning (تنظيف…, إزالة البقع). The Gulf summer adds heat and cooling questions; this is my own inference.

## 4. What this means for the Life Hacks scope

1. **[inference, medium-high] The 19 wikiHow categories are a usable top-level map, but our product can only fill part of it.** We need a mechanism we can show on the stage and a refuse list we keep. That rules out most of Health, Philosophy and Religion, Relationships, Personal Care advice, and the advice half of Finance and Business. Mawdoo3 adds more categories (religion, poetry, history) that are not how-to at all. "Scope like WikiHow" should mean breadth across *practical* categories, not every category.
2. **[inference, medium] The best candidate branches, where demand meets a checkable mechanism and is safe or safety-reviewable:** Kitchen and food (heat, salt, freezing, storage); Cleaning and laundry (stains, drying, solvents; chemical-mixing is refused); Home repair and DIY (levers, friction, levelling; electrical beyond bulb and breaker is refused); Tech and phone (battery, charging, storage, search); Study and memory (spacing, retrieval: strong literature); Money arithmetic (unit price, percent, compounding; arithmetic only); Travel and packing; Car and bike basics (tire pressure, braking distance); Garden and plants; Pets (safety-reviewed); Clothing and textiles (knots, folding, shrinking).
3. **[web fact + inference, high on the fact] PR #2 (`origin/codex/lifehacks-200`) does not follow demand.** Its 200 titles (70 home, 70 study, 60 resources) are mostly abstract measurement, arithmetic and scheduling ideas ("Sorted labels allow a halving search", "Modified is not created", "Billing rounds the quantity", "Give the meeting an outcome"). I found almost none in the top demand clusters: no cooking, no stains or laundry chemistry, no phone or tech tasks, no car, no garden, no pets, no clothing care. Only the "resources" group overlaps with the money-arithmetic demand. If PR #2 lands as is, the category will be broad in count and narrow in demand. This is a reading of titles only; I did not review the lessons.
4. **[inference] Arabic is a separate demand map, not a translation.** Its how-to centre of gravity is recipes, study and exams, and home cleaning; religious practice is large but out of scope. If Arabic is a target market, the International team should own an Arabic demand pull before Arabic lessons are chosen.

## Open questions (in priority order)
1. Per-category article counts for wikiHow: open arXiv 2009.07690 Appendix B, or count the public dataset. (research-scientist, needs network access)
2. A live check of the wikiHow and Mawdoo3 category trees. (research-scientist, needs network access)
3. Arabic how-to search volumes for EG and SA: Google Trends comparison of "طريقة عمل", "كيفية تنظيف", "طريقة المذاكرة", "كيف أ…". (research-scientist, or the International team)
4. English perennial how-to volumes by cluster (Ahrefs or Semrush keyword export, to replace the [inference] ranking in section 3).
