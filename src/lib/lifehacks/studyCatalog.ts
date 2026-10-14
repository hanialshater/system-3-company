import type { StudySpec } from "./studyModels";

// Named fixtures let lesson bundles include only their own data. No measured effects.

export const study_spaced_beats_cram = {
  "family": "spacing",
  "slug": "spaced-beats-cram",
  "title": "Same hours, different calendar",
  "hook": "Three hours in one block or across three days: what changes a month later?",
  "objective": "Separate the research-supported spacing effect from invented memory curves.",
  "question": "For equal study time, which plan generally supports longer-term verbal recall?",
  "options": [
    "Distributed sessions",
    "One massed session",
    "Calendar cannot matter"
  ],
  "answer": 0,
  "principle": "Research on verbal recall supports distributed practice. The curves illustrate that idea; they do not predict your memory.",
  "boundary": "Illustrative curves; not personal memory predictions.",
  "source": "Cepeda et al. (2006), Distributed practice in verbal recall tasks, Psychological Bulletin132(3),354–380, DOI10.1037/0033-2909.132.3.354, author abstract via https://pubmed.ncbi.nlm.nih.gov/16719566/ retrieved2026-10-13; 839 assessments in317 experiments. Rawson & Kintsch(2005), Rereading Effects Depend on Time of Test, JEP97(1),70–80, DOI10.1037/0022-0663.97.1.70, author abstract search record https://eric.ed.gov/?id=EJ688037 retrieved2026-10-13 (direct page timed out). Retrieval line supported separately by Roediger & Karpicke(2006), Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner.",
  "misconception": "Equal study hours imply equal long-term recall regardless of calendar.",
  "days": [
    -2,
    -1,
    0
  ]
} satisfies StudySpec;

export const study_cover_before_recall = {
  "family": "recall",
  "slug": "cover-before-recall",
  "title": "Cover before you test",
  "hook": "Seeing the answer and retrieving it are different activities.",
  "objective": "Perform a closed-answer check before using feedback.",
  "question": "Which check asks you to retrieve an answer?",
  "options": [
    "Answer covered",
    "Answer beside the cue"
  ],
  "answer": 0,
  "principle": "Covering the answer removes the direct reading route. This reconstruction records one attempt, not a long-term memory score.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Answer beside the cue",
  "labels": [
    "bell",
    "kite",
    "leaf"
  ],
  "words": [
    "lake",
    "plum",
    "door"
  ],
  "kind": "pairs"
} satisfies StudySpec;

export const study_one_question_one_card = {
  "family": "recall",
  "slug": "one-question-one-card",
  "title": "One question per card",
  "hook": "A card asking three things can hide which one you missed.",
  "objective": "Split a compound prompt into separately checkable cues.",
  "question": "Which card makes a missed item identifiable?",
  "options": [
    "One target per cue",
    "Three targets per cue"
  ],
  "answer": 0,
  "principle": "Separate cues expose separate gaps. A correct answer to one cue does not establish knowledge of the other two.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Three targets per cue",
  "labels": [
    "who",
    "where",
    "when"
  ],
  "words": [
    "Mina",
    "library",
    "Tuesday"
  ],
  "kind": "pairs"
} satisfies StudySpec;

export const study_cue_needs_a_boundary = {
  "family": "recall",
  "slug": "cue-needs-a-boundary",
  "title": "Give the cue a boundary",
  "hook": "“Capital?” is too vague when your notes mention three countries.",
  "objective": "Attach context to an ambiguous retrieval cue.",
  "question": "Which cue uniquely identifies the target in these notes?",
  "options": [
    "Country plus capital",
    "Capital alone"
  ],
  "answer": 0,
  "principle": "Each country cue identifies one answer in this fixture. A cue that could refer to several facts is under-specified.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Capital alone",
  "labels": [
    "Japan",
    "Kenya",
    "Peru"
  ],
  "words": [
    "Tokyo",
    "Nairobi",
    "Lima"
  ],
  "kind": "pairs"
} satisfies StudySpec;

export const study_reverse_the_flashcard = {
  "family": "recall",
  "slug": "reverse-the-flashcard",
  "title": "Test the other direction",
  "hook": "Knowing a word from its meaning does not check the reverse direction.",
  "objective": "Distinguish two directions of an arbitrary word-pair mapping.",
  "question": "Which checks meaning-to-word retrieval?",
  "options": [
    "Hide the word",
    "Hide the meaning"
  ],
  "answer": 0,
  "principle": "Reverse the cue and answer to check the opposite mapping. A result in one direction is not a test of the other.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Hide the meaning",
  "labels": [
    "red",
    "blue",
    "green"
  ],
  "words": [
    "dax",
    "wug",
    "zib"
  ],
  "kind": "pairs"
} satisfies StudySpec;

export const study_rebuild_the_procedure = {
  "family": "recall",
  "slug": "rebuild-the-procedure",
  "title": "Rebuild the steps",
  "hook": "You remember all three actions. Do you remember their order?",
  "objective": "Reconstruct a procedure as an ordered sequence.",
  "question": "Which test checks procedure order?",
  "options": [
    "Rebuild the sequence",
    "Recognise each word"
  ],
  "answer": 0,
  "principle": "This procedure has an explicit order: collect, sort, file. The check compares positions, so owning the right words is insufficient.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Recognise each word",
  "labels": [
    "1",
    "2",
    "3"
  ],
  "words": [
    "collect",
    "sort",
    "file"
  ],
  "kind": "sequence"
} satisfies StudySpec;

export const study_note_gap_check = {
  "family": "recall",
  "slug": "note-gap-check",
  "title": "Find the missing note",
  "hook": "A complete-looking page can still lack the detail you need.",
  "objective": "Reconstruct a missing field from a short source note.",
  "question": "Which check tests whether the missing details are known?",
  "options": [
    "Cover then reconstruct",
    "Read the completed note"
  ],
  "answer": 0,
  "principle": "The note has three named fields. Reconstructing their values makes missing details visible; this is a local completeness check.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Read the completed note",
  "labels": [
    "room",
    "day",
    "code"
  ],
  "words": [
    "B4",
    "Friday",
    "627"
  ],
  "kind": "pairs"
} satisfies StudySpec;

export const study_explain_the_link = {
  "family": "recall",
  "slug": "explain-the-link",
  "title": "Remember the links",
  "hook": "A list of words is not yet an explanation.",
  "objective": "Reconstruct an explicit cause-and-consequence chain without its source.",
  "question": "Which test preserves the explanatory links?",
  "options": [
    "Ordered cause chain",
    "Alphabetical words"
  ],
  "answer": 0,
  "principle": "The example says cloud then rain then puddle. This checks the stated chain, not whether every cloud produces rain.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Alphabetical words",
  "labels": [
    "cause",
    "event",
    "result"
  ],
  "words": [
    "cloud",
    "rain",
    "puddle"
  ],
  "kind": "sequence"
} satisfies StudySpec;

export const study_apply_not_quote = {
  "family": "recall",
  "slug": "apply-not-quote",
  "title": "Apply the rule",
  "hook": "Quoting “sort ascending” is easier than applying it to new values.",
  "objective": "Use a stated sorting rule on a fresh set rather than repeat its wording.",
  "question": "What checks application of ascending order?",
  "options": [
    "Order new values",
    "Quote the definition"
  ],
  "answer": 0,
  "principle": "The target uses new values ordered smallest to largest. Matching the rule requires applying it to the numbers shown.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Quote the definition",
  "labels": [
    "first",
    "next",
    "last"
  ],
  "words": [
    "2",
    "5",
    "9"
  ],
  "kind": "rule"
} satisfies StudySpec;

export const study_separate_confusable_pairs = {
  "family": "recall",
  "slug": "separate-confusable-pairs",
  "title": "Separate similar pairs",
  "hook": "Two almost identical labels need a distinguishing cue.",
  "objective": "Check the specific difference between two arbitrary codes.",
  "question": "Which notes distinguish these codes?",
  "options": [
    "Code plus distinguishing field",
    "Shared description only"
  ],
  "answer": 0,
  "principle": "The last digit distinguishes the two codes in the fixture. The same shared description would not identify which code was intended.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Shared description only",
  "labels": [
    "AX1",
    "AX2",
    "AX3"
  ],
  "words": [
    "left",
    "right",
    "centre"
  ],
  "kind": "pairs"
} satisfies StudySpec;

export const study_check_confidence_with_output = {
  "family": "recall",
  "slug": "check-confidence-with-output",
  "title": "Check confidence with output",
  "hook": "“I know this” and a checked reconstruction are different evidence.",
  "objective": "Compare felt familiarity with a scored local reconstruction.",
  "question": "Which provides an observable local check?",
  "options": [
    "Checked reconstruction",
    "Feeling familiar"
  ],
  "answer": 0,
  "principle": "The check counts matching positions. It can expose a mismatch, but this single attempt cannot estimate future retention or general ability.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Feeling familiar",
  "labels": [
    "1",
    "2",
    "3"
  ],
  "words": [
    "map",
    "key",
    "route"
  ],
  "kind": "sequence"
} satisfies StudySpec;

export const study_keep_the_error_feedback = {
  "family": "recall",
  "slug": "keep-the-error-feedback",
  "title": "Keep the correction",
  "hook": "An answer attempt is useful evidence only if you compare it with the target.",
  "objective": "Use feedback to locate a specific mismatch instead of only counting attempts.",
  "question": "Which feedback locates the mistake?",
  "options": [
    "Target beside attempt",
    "Attempt count alone"
  ],
  "answer": 0,
  "principle": "Comparison marks each position, including errors. A count of attempts alone would not reveal which item needs correction.",
  "boundary": "One short reconstruction; not a retention experiment.",
  "source": "Roediger & Karpicke (2006), Test-Enhanced Learning, Psychological Science 17(3),249–255, DOI10.1111/j.1467-9280.2006.01693.x; publisher abstract retrieved 2026-10-13: https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.2006.01693.x/ . Prose-passage experiments found delayed retention advantages for retrieval over restudy. This short exercise does not establish that effect for the learner. Fixture mappings and rules are explicit conventions, not empirical demonstrations.",
  "misconception": "Attempt count alone",
  "labels": [
    "1",
    "2",
    "3"
  ],
  "words": [
    "draft",
    "check",
    "send"
  ],
  "kind": "sequence"
} satisfies StudySpec;

export const study_calendar_needs_travel = {
  "family": "schedule",
  "slug": "calendar-needs-travel",
  "title": "Travel occupies the calendar",
  "hook": "The meeting fits. Does the journey fit too?",
  "objective": "Reserve travel as a separate time block.",
  "question": "Which layout includes the journey?",
  "options": [
    "Travel before meeting",
    "Meeting only"
  ],
  "answer": 0,
  "principle": "Travel time occupies a block just as the meeting does. In this fixture, an overlap means the same person is booked twice.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Meeting only",
  "rows": [
    {
      "label": "travel",
      "start": 0,
      "duration": 15
    },
    {
      "label": "meeting",
      "start": 10,
      "duration": 20
    },
    {
      "label": "email",
      "start": 35,
      "duration": 10
    }
  ],
  "target": [
    0,
    15,
    35
  ],
  "movable": 1,
  "button": "Move meeting",
  "deadline": 90
} satisfies StudySpec;

export const study_buffer_for_a_late_finish = {
  "family": "schedule",
  "slug": "buffer-for-a-late-finish",
  "title": "Leave a finish buffer",
  "hook": "One task runs five minutes late. Which appointment absorbs it?",
  "objective": "Distinguish planned slack from overlapping bookings.",
  "question": "What keeps five minutes of delay from overlapping the next task?",
  "options": [
    "A five-minute gap",
    "Touching blocks"
  ],
  "answer": 0,
  "principle": "A gap can absorb up to its length of delay in this schedule. It is a stated allowance, not a guarantee about real tasks.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Touching blocks",
  "rows": [
    {
      "label": "draft",
      "start": 0,
      "duration": 20
    },
    {
      "label": "call",
      "start": 20,
      "duration": 15
    },
    {
      "label": "notes",
      "start": 35,
      "duration": 10
    }
  ],
  "target": [
    0,
    25,
    45
  ],
  "movable": 1,
  "button": "Add buffer",
  "deadline": 90
} satisfies StudySpec;

export const study_work_back_from_a_deadline = {
  "family": "schedule",
  "slug": "work-back-from-a-deadline",
  "title": "Plan backwards",
  "hook": "A thirty-minute task due at minute forty cannot start whenever you like.",
  "objective": "Compute a latest start from duration and deadline.",
  "question": "Latest start for 30 minutes due at minute 40?",
  "options": [
    "Minute 10",
    "Minute 30"
  ],
  "answer": 0,
  "principle": "Latest start equals deadline minus duration. Moving the block later than minute ten leaves part of it after the deadline.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Minute 30",
  "rows": [
    {
      "label": "draft",
      "start": 20,
      "duration": 30
    },
    {
      "label": "review",
      "start": 50,
      "duration": 10
    },
    {
      "label": "send",
      "start": 60,
      "duration": 5
    }
  ],
  "target": [
    10,
    40,
    50
  ],
  "movable": 0,
  "button": "Start backwards",
  "deadline": 40
} satisfies StudySpec;

export const study_meeting_and_preparation = {
  "family": "schedule",
  "slug": "meeting-and-preparation",
  "title": "Preparation needs its own slot",
  "hook": "You booked the presentation, but where did preparation go?",
  "objective": "Schedule preparation before a dependent live task.",
  "question": "Which layout makes preparation finish first?",
  "options": [
    "Prepare then present",
    "Prepare during presentation"
  ],
  "answer": 0,
  "principle": "The exercise requires preparation to finish before presenting. A shared calendar must include the prerequisite, not only the visible event.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Prepare during presentation",
  "rows": [
    {
      "label": "prepare",
      "start": 10,
      "duration": 20
    },
    {
      "label": "present",
      "start": 20,
      "duration": 15
    },
    {
      "label": "notes",
      "start": 35,
      "duration": 10
    }
  ],
  "target": [
    0,
    20,
    35
  ],
  "movable": 0,
  "button": "Move preparation",
  "deadline": 90
} satisfies StudySpec;

export const study_estimate_a_range = {
  "family": "schedule",
  "slug": "estimate-a-range",
  "title": "Try the longer estimate",
  "hook": "A task estimated at fifteen to twenty-five minutes needs more than one calendar test.",
  "objective": "Stress-test a schedule at the longer end of an explicit range.",
  "question": "Which checks the stated worst duration?",
  "options": [
    "Use 25 minutes",
    "Use 15 minutes"
  ],
  "answer": 0,
  "principle": "The first block is shown at the longer stated duration. Check overlap at that endpoint before treating the optimistic estimate as enough.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Use 15 minutes",
  "rows": [
    {
      "label": "write",
      "start": 0,
      "duration": 25
    },
    {
      "label": "call",
      "start": 15,
      "duration": 15
    },
    {
      "label": "file",
      "start": 30,
      "duration": 10
    }
  ],
  "target": [
    0,
    25,
    40
  ],
  "movable": 1,
  "button": "Use upper estimate",
  "deadline": 90
} satisfies StudySpec;

export const study_one_person_two_jobs = {
  "family": "schedule",
  "slug": "one-person-two-jobs",
  "title": "One person, two blocks",
  "hook": "Separate rows do not give you two pairs of hands.",
  "objective": "Detect simultaneous bookings for one constrained resource.",
  "question": "How many blocks can one person do simultaneously in this model?",
  "options": [
    "One",
    "Two"
  ],
  "answer": 0,
  "principle": "All rows use the same person. The overlap calculation tests concurrent demand; drawing tasks on separate rows does not create extra capacity.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Two",
  "rows": [
    {
      "label": "scan",
      "start": 0,
      "duration": 20
    },
    {
      "label": "write",
      "start": 10,
      "duration": 20
    },
    {
      "label": "call",
      "start": 25,
      "duration": 10
    }
  ],
  "target": [
    0,
    20,
    40
  ],
  "movable": 1,
  "button": "Separate jobs",
  "deadline": 90
} satisfies StudySpec;

export const study_fit_before_fixed_slot = {
  "family": "schedule",
  "slug": "fit-before-fixed-slot",
  "title": "Fit around the fixed slot",
  "hook": "A movable task fits only if it respects the fixed appointment.",
  "objective": "Place flexible work around a fixed calendar interval.",
  "question": "Which placement avoids the fixed call?",
  "options": [
    "Finish before the call",
    "Overlap the call"
  ],
  "answer": 0,
  "principle": "The call is fixed at minute twenty. Only the movable task changes; fitting flexible work requires respecting occupied intervals.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Overlap the call",
  "rows": [
    {
      "label": "write",
      "start": 10,
      "duration": 20
    },
    {
      "label": "call",
      "start": 20,
      "duration": 15
    },
    {
      "label": "file",
      "start": 35,
      "duration": 10
    }
  ],
  "target": [
    0,
    20,
    35
  ],
  "movable": 0,
  "button": "Place before call",
  "deadline": 90
} satisfies StudySpec;

export const study_include_the_wrap_up = {
  "family": "schedule",
  "slug": "include-the-wrap-up",
  "title": "The finish is not the end",
  "hook": "The call ends, but notes still need ten minutes.",
  "objective": "Include a required follow-up block in total calendar capacity.",
  "question": "Which plan counts the follow-up?",
  "options": [
    "Call plus notes",
    "Call alone"
  ],
  "answer": 0,
  "principle": "The notes block is a separate required task. The last finish counts it, so a calendar ending at the call understates this fixture’s workload.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Call alone",
  "rows": [
    {
      "label": "call",
      "start": 0,
      "duration": 20
    },
    {
      "label": "notes",
      "start": 15,
      "duration": 10
    },
    {
      "label": "review",
      "start": 25,
      "duration": 10
    }
  ],
  "target": [
    0,
    20,
    30
  ],
  "movable": 1,
  "button": "Place follow-up",
  "deadline": 90
} satisfies StudySpec;

export const study_fragmented_time_does_not_fit = {
  "family": "schedule",
  "slug": "fragmented-time-does-not-fit",
  "title": "Thirty scattered minutes",
  "hook": "Three gaps total thirty minutes. A single thirty-minute task still may not fit.",
  "objective": "Distinguish total free time from one continuous interval.",
  "question": "What does an unsplittable 30-minute block require?",
  "options": [
    "A continuous 30-minute gap",
    "Any three 10-minute gaps"
  ],
  "answer": 0,
  "principle": "This task is explicitly unsplittable. Total available minutes and the longest continuous gap answer different questions.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Any three 10-minute gaps",
  "rows": [
    {
      "label": "write",
      "start": 0,
      "duration": 30
    },
    {
      "label": "call",
      "start": 10,
      "duration": 10
    },
    {
      "label": "meeting",
      "start": 30,
      "duration": 10
    }
  ],
  "target": [
    40,
    10,
    30
  ],
  "movable": 0,
  "button": "Use continuous gap",
  "deadline": 90
} satisfies StudySpec;

export const study_handoff_after_finish = {
  "family": "schedule",
  "slug": "handoff-after-finish",
  "title": "A handoff has a release time",
  "hook": "The reviewer cannot start with a draft that has not finished.",
  "objective": "Schedule a dependent task after its input is ready.",
  "question": "When can review start in this model?",
  "options": [
    "After draft finishes",
    "When drafting starts"
  ],
  "answer": 0,
  "principle": "Draft completion releases the input for review. Overlap may be possible in other workflows, but this fixture explicitly forbids partial handoffs.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "When drafting starts",
  "rows": [
    {
      "label": "draft",
      "start": 0,
      "duration": 25
    },
    {
      "label": "review",
      "start": 15,
      "duration": 15
    },
    {
      "label": "send",
      "start": 30,
      "duration": 5
    }
  ],
  "target": [
    0,
    25,
    40
  ],
  "movable": 1,
  "button": "Wait for handoff",
  "deadline": 90
} satisfies StudySpec;

export const study_count_setup_in_the_block = {
  "family": "schedule",
  "slug": "count-setup-in-the-block",
  "title": "Setup takes time too",
  "hook": "Ten minutes of work plus five minutes of setup is a fifteen-minute booking.",
  "objective": "Include setup duration rather than just execution time.",
  "question": "How long is this combined setup-and-work block?",
  "options": [
    "15 minutes",
    "10 minutes"
  ],
  "answer": 0,
  "principle": "The first block includes the visible five-minute setup and ten-minute execution. The calendar cannot fit fifteen minutes inside a ten-minute allowance.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "10 minutes",
  "rows": [
    {
      "label": "setup+work",
      "start": 0,
      "duration": 15
    },
    {
      "label": "call",
      "start": 10,
      "duration": 15
    },
    {
      "label": "file",
      "start": 25,
      "duration": 10
    }
  ],
  "target": [
    0,
    15,
    30
  ],
  "movable": 1,
  "button": "Count setup",
  "deadline": 90
} satisfies StudySpec;

export const study_arrival_is_not_departure = {
  "family": "schedule",
  "slug": "arrival-is-not-departure",
  "title": "Arrival time works backwards",
  "hook": "A twenty-minute trip for a minute-forty arrival has a latest departure.",
  "objective": "Compute a departure block ending at the required arrival.",
  "question": "Latest departure for this 20-minute trip?",
  "options": [
    "Minute 20",
    "Minute 40"
  ],
  "answer": 0,
  "principle": "The travel block must end at the arrival requirement. Start equals arrival minus journey duration; the model leaves real traffic uncertainty out.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Minute 40",
  "rows": [
    {
      "label": "travel",
      "start": 30,
      "duration": 20
    },
    {
      "label": "visit",
      "start": 40,
      "duration": 15
    },
    {
      "label": "return",
      "start": 55,
      "duration": 20
    }
  ],
  "target": [
    20,
    40,
    55
  ],
  "movable": 0,
  "button": "Move departure",
  "deadline": 40
} satisfies StudySpec;

export const study_reserve_an_unassigned_slot = {
  "family": "schedule",
  "slug": "reserve-an-unassigned-slot",
  "title": "Slack has a size",
  "hook": "A completely booked hour has no space for an extra ten-minute task.",
  "objective": "Recognise that spare calendar capacity is an explicit resource.",
  "question": "What can accommodate an unplanned 10-minute task here?",
  "options": [
    "A free 10-minute interval",
    "A fully booked hour"
  ],
  "answer": 0,
  "principle": "The final layout reserves capacity by moving optional work. Slack is unused time in this fixture, not evidence that the day will stay predictable.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "A fully booked hour",
  "rows": [
    {
      "label": "focus",
      "start": 0,
      "duration": 30
    },
    {
      "label": "admin",
      "start": 30,
      "duration": 20
    },
    {
      "label": "call",
      "start": 50,
      "duration": 10
    }
  ],
  "target": [
    0,
    40,
    60
  ],
  "movable": 1,
  "button": "Reserve ten minutes",
  "deadline": 90
} satisfies StudySpec;

export const study_short_jobs_clear_a_queue = {
  "family": "order",
  "slug": "short-jobs-clear-a-queue",
  "title": "Clear the short jobs",
  "hook": "Same total work, different waiting time for the people in this queue.",
  "objective": "Compare total waiting under two orders.",
  "question": "With all jobs ready, which reduces total waiting in this fixture?",
  "options": [
    "Short jobs first",
    "Long jobs first"
  ],
  "answer": 0,
  "principle": "Total waiting is the sum of each start time. Moving a short job ahead reduces how long later jobs wait; this objective ignores deadlines.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Long jobs first",
  "labels": [
    "long",
    "quick",
    "small"
  ],
  "durations": [
    30,
    5,
    10
  ],
  "due": [
    60,
    60,
    60
  ],
  "target": [
    1,
    2,
    0
  ],
  "initial": [
    0,
    1,
    2
  ],
  "metric": "waiting",
  "dependencies": {},
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 0
} satisfies StudySpec;

export const study_earliest_deadline_first = {
  "family": "order",
  "slug": "earliest-deadline-first",
  "title": "Read the due dates",
  "hook": "A shorter task can wait while an earlier deadline cannot.",
  "objective": "Compare deadline misses instead of only completion count.",
  "question": "Which order respects the minute-15 deadline here?",
  "options": [
    "Urgent job first",
    "Short job first"
  ],
  "answer": 0,
  "principle": "The red deadline markers compare completion with due time. This fixture rewards meeting due dates, rather than minimising average waiting.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Short job first",
  "labels": [
    "urgent",
    "quick",
    "later"
  ],
  "durations": [
    15,
    5,
    10
  ],
  "due": [
    15,
    40,
    50
  ],
  "target": [
    0,
    1,
    2
  ],
  "initial": [
    2,
    1,
    0
  ],
  "metric": "late",
  "dependencies": {},
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 0
} satisfies StudySpec;

export const study_dependency_before_priority = {
  "family": "order",
  "slug": "dependency-before-priority",
  "title": "Priority cannot bypass input",
  "hook": "The important output cannot run before its input exists.",
  "objective": "Distinguish task priority from prerequisite readiness.",
  "question": "Which order respects the stated dependency?",
  "options": [
    "Draft before review",
    "Review before draft"
  ],
  "answer": 0,
  "principle": "The review requires the draft to be finished. A high priority label changes neither that prerequisite nor the input release time.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Review before draft",
  "labels": [
    "review",
    "draft",
    "send"
  ],
  "durations": [
    10,
    20,
    5
  ],
  "due": [
    60,
    60,
    60
  ],
  "target": [
    1,
    0,
    2
  ],
  "initial": [
    0,
    1,
    2
  ],
  "metric": "dependency",
  "dependencies": {
    "0": 1,
    "2": 0
  },
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 0
} satisfies StudySpec;

export const study_batch_by_setup = {
  "family": "order",
  "slug": "batch-by-setup",
  "title": "Batch the shared setup",
  "hook": "Changing contexts costs two minutes here. Count the changes.",
  "objective": "Compare setup overhead under an explicit switching cost.",
  "question": "Which order needs fewer setup switches?",
  "options": [
    "Group equal tags",
    "Alternate tags"
  ],
  "answer": 0,
  "principle": "Each change of tag costs the stated two minutes. Grouping equal tags removes switches in this model; it does not estimate your real concentration cost.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Alternate tags",
  "labels": [
    "A1",
    "B1",
    "A2"
  ],
  "durations": [
    5,
    5,
    5
  ],
  "due": [
    50,
    50,
    50
  ],
  "target": [
    0,
    2,
    1
  ],
  "initial": [
    0,
    1,
    2
  ],
  "metric": "switches",
  "dependencies": {},
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 2
} satisfies StudySpec;

export const study_unlock_the_following_work = {
  "family": "order",
  "slug": "unlock-the-following-work",
  "title": "Start the blocking input",
  "hook": "A tiny input task can unlock a much larger dependent task.",
  "objective": "Identify the work that releases a blocked successor.",
  "question": "Which goes before the dependent build?",
  "options": [
    "Input task",
    "Unrelated polish"
  ],
  "answer": 0,
  "principle": "The build depends on the input. Doing unrelated work first delays release, even when that unrelated work is useful.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Unrelated polish",
  "labels": [
    "polish",
    "input",
    "build"
  ],
  "durations": [
    15,
    5,
    20
  ],
  "due": [
    60,
    60,
    60
  ],
  "target": [
    1,
    2,
    0
  ],
  "initial": [
    0,
    1,
    2
  ],
  "metric": "dependency",
  "dependencies": {
    "2": 1
  },
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 0
} satisfies StudySpec;

export const study_do_not_starve_the_long_job = {
  "family": "order",
  "slug": "do-not-starve-the-long-job",
  "title": "The short-job trade-off",
  "hook": "Clearing tiny tasks first can delay the long task’s own deadline.",
  "objective": "Compare waiting and lateness when their objectives conflict.",
  "question": "For this long job due at minute 25, which order meets its deadline?",
  "options": [
    "Long job first",
    "Small jobs first"
  ],
  "answer": 0,
  "principle": "Short-job ordering is not a universal priority rule. The stated deadline makes the long job urgent in this fixture.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Small jobs first",
  "labels": [
    "small",
    "tiny",
    "long"
  ],
  "durations": [
    5,
    5,
    25
  ],
  "due": [
    60,
    60,
    25
  ],
  "target": [
    2,
    0,
    1
  ],
  "initial": [
    0,
    1,
    2
  ],
  "metric": "late",
  "dependencies": {},
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 0
} satisfies StudySpec;

export const study_work_in_process_limit = {
  "family": "order",
  "slug": "work-in-process-limit",
  "title": "Finish before starting more",
  "hook": "Three started tasks are not three finished tasks.",
  "objective": "Compare serial completion to round-robin partial progress.",
  "question": "Which completes the first five-minute job at minute five?",
  "options": [
    "One job to completion",
    "Split five minutes across jobs"
  ],
  "answer": 0,
  "principle": "The bars represent whole-task execution. Starting everything would spread progress without completing the first job; completion and activity are different counts.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Split five minutes across jobs",
  "labels": [
    "one",
    "two",
    "three"
  ],
  "durations": [
    5,
    10,
    15
  ],
  "due": [
    50,
    50,
    50
  ],
  "target": [
    0,
    1,
    2
  ],
  "initial": [
    2,
    1,
    0
  ],
  "metric": "completion",
  "dependencies": {},
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 0
} satisfies StudySpec;

export const study_separate_ready_from_blocked = {
  "family": "order",
  "slug": "separate-ready-from-blocked",
  "title": "Ready is a task property",
  "hook": "A blocked task belongs on the board, but cannot run yet.",
  "objective": "Move blocked work behind its explicitly required input.",
  "question": "Which task can run before the input arrives?",
  "options": [
    "Independent work",
    "Blocked output"
  ],
  "answer": 0,
  "principle": "The output requires the input in this exercise. An ordering that executes it first violates the dependency, regardless of its position on a to-do list.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Blocked output",
  "labels": [
    "output",
    "independent",
    "input"
  ],
  "durations": [
    15,
    10,
    5
  ],
  "due": [
    60,
    60,
    60
  ],
  "target": [
    1,
    2,
    0
  ],
  "initial": [
    0,
    1,
    2
  ],
  "metric": "dependency",
  "dependencies": {
    "0": 2
  },
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 0
} satisfies StudySpec;

export const study_delegate_the_whole_handoff = {
  "family": "order",
  "slug": "delegate-the-whole-handoff",
  "title": "Delegation includes a handoff",
  "hook": "The helper saves work only after receiving the input.",
  "objective": "Include coordination as a prerequisite instead of ignoring it.",
  "question": "What must precede the helper task here?",
  "options": [
    "Handoff",
    "Unrelated editing"
  ],
  "answer": 0,
  "principle": "The handoff releases the helper’s input. This single-resource model checks order only; it makes no claim about real delegation speedups.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Unrelated editing",
  "labels": [
    "helper",
    "editing",
    "handoff"
  ],
  "durations": [
    10,
    15,
    5
  ],
  "due": [
    60,
    60,
    60
  ],
  "target": [
    2,
    0,
    1
  ],
  "initial": [
    0,
    1,
    2
  ],
  "metric": "dependency",
  "dependencies": {
    "0": 2
  },
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 0
} satisfies StudySpec;

export const study_choose_the_metric_first = {
  "family": "order",
  "slug": "choose-the-metric-first",
  "title": "Choose the metric first",
  "hook": "A queue can look better by one score and worse by another.",
  "objective": "Compare waiting and deadline misses for one fixed order.",
  "question": "What is required before calling an order better?",
  "options": [
    "Choose the objective",
    "Count visible movement"
  ],
  "answer": 0,
  "principle": "The displayed waiting and late counts measure different things. A preference requires an explicit objective; more animation is not an outcome.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Count visible movement",
  "labels": [
    "short",
    "urgent",
    "long"
  ],
  "durations": [
    5,
    15,
    20
  ],
  "due": [
    50,
    15,
    60
  ],
  "target": [
    1,
    0,
    2
  ],
  "initial": [
    0,
    1,
    2
  ],
  "metric": "late",
  "dependencies": {},
  "tags": [
    "A",
    "B",
    "A"
  ],
  "switchCost": 0
} satisfies StudySpec;

export const study_file_type_then_owner = {
  "family": "files",
  "slug": "file-type-then-owner",
  "title": "Narrow with two filters",
  "hook": "Four files match one clue. Which one matches both?",
  "objective": "Intersect type and owner filters.",
  "question": "What does adding an owner filter to PDF mean?",
  "options": [
    "Both conditions",
    "Either condition"
  ],
  "answer": 0,
  "principle": "Combining these two filters requires both fields to match. The fixture counts the intersection, rather than adding the two result sets.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "Either condition",
  "items": [
    {
      "name": "plan.pdf",
      "value": "Ana",
      "type": "pdf"
    },
    {
      "name": "map.pdf",
      "value": "Bo",
      "type": "pdf"
    },
    {
      "name": "note.txt",
      "value": "Ana",
      "type": "txt"
    },
    {
      "name": "list.txt",
      "value": "Bo",
      "type": "txt"
    }
  ],
  "operation": "filter",
  "button": "PDF only",
  "field": "type",
  "value": "pdf",
  "field2": "value",
  "value2": "Ana",
  "button2": "Ana only"
} satisfies StudySpec;

export const study_mail_exact_phrase = {
  "family": "files",
  "slug": "mail-exact-phrase",
  "title": "Keep the phrase together",
  "hook": "“Blue folder” and “folder is blue” do not contain the same exact phrase.",
  "objective": "Distinguish an exact phrase from two unordered words.",
  "question": "What does a quoted phrase require in this fixture?",
  "options": [
    "Same adjacent words",
    "Words anywhere"
  ],
  "answer": 0,
  "principle": "The quoted phrase matches an adjacent sequence. Separate words would match a larger set; quotation changes the matching rule.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Gmail Help, Refine searches in Gmail, operator table; retrieved 2026-10-13: https://support.google.com/mail/answer/7190?hl=en . Fixture tests explicit fields only, not live Gmail conversation-level behaviour.",
  "misconception": "Words anywhere",
  "items": [
    {
      "name": "m1",
      "value": "blue folder"
    },
    {
      "name": "m2",
      "value": "folder is blue"
    },
    {
      "name": "m3",
      "value": "blue map"
    },
    {
      "name": "m4",
      "value": "red folder"
    }
  ],
  "operation": "phrase",
  "button": "Both words",
  "value": "blue folder",
  "button2": "Exact phrase"
} satisfies StudySpec;

export const study_mail_minus_noise = {
  "family": "files",
  "slug": "mail-minus-noise",
  "title": "Exclude the noisy term",
  "hook": "The right topic appears in both notes and newsletters.",
  "objective": "Use exclusion to remove an explicitly unwanted term.",
  "question": "Which query removes newsletter matches?",
  "options": [
    "Topic minus newsletter",
    "Topic OR newsletter"
  ],
  "answer": 0,
  "principle": "The second query keeps topic matches that lack the excluded word. This local field matcher leaves Gmail’s conversation grouping out.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Gmail Help, Refine searches in Gmail, operator table; retrieved 2026-10-13: https://support.google.com/mail/answer/7190?hl=en . Fixture tests explicit fields only, not live Gmail conversation-level behaviour.",
  "misconception": "Topic OR newsletter",
  "items": [
    {
      "name": "m1",
      "value": "train notes"
    },
    {
      "name": "m2",
      "value": "train newsletter"
    },
    {
      "name": "m3",
      "value": "bus notes"
    },
    {
      "name": "m4",
      "value": "train draft"
    }
  ],
  "operation": "exclude",
  "button": "Find train",
  "value": "train",
  "value2": "newsletter",
  "button2": "Exclude newsletter"
} satisfies StudySpec;

export const study_file_modified_not_created = {
  "family": "files",
  "slug": "file-modified-not-created",
  "title": "Modified is not created",
  "hook": "A newly edited old file and a newly created file answer different searches.",
  "objective": "Distinguish creation and modification date filters.",
  "question": "For recent edits, which field matters?",
  "options": [
    "Modified date",
    "Created date"
  ],
  "answer": 0,
  "principle": "The fixture stores both dates. A recently modified file may have been created long before; the field must match the question.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "Created date",
  "items": [
    {
      "name": "old.txt",
      "value": "C1 M9",
      "created": 1,
      "modified": 9
    },
    {
      "name": "new.txt",
      "value": "C8 M8",
      "created": 8,
      "modified": 8
    },
    {
      "name": "past.txt",
      "value": "C1 M2",
      "created": 1,
      "modified": 2
    }
  ],
  "operation": "date",
  "button": "Created ≥8",
  "field": "created",
  "field2": "modified",
  "value": 8,
  "button2": "Modified ≥8"
} satisfies StudySpec;

export const study_iso_date_filename_sort = {
  "family": "files",
  "slug": "iso-date-filename-sort",
  "title": "Sort dates by their names",
  "hook": "Day-first names mix months when sorted alphabetically.",
  "objective": "Compare lexicographic ordering of two explicit date formats.",
  "question": "Which format sorts these dates chronologically as text?",
  "options": [
    "YYYY-MM-DD",
    "DD-MM-YYYY"
  ],
  "answer": 0,
  "principle": "The year-month-day names put the largest time unit first. For these fixed-width dates, alphabetical and chronological order coincide.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "DD-MM-YYYY",
  "items": [
    {
      "name": "02-11-2026",
      "value": "2026-11-02"
    },
    {
      "name": "15-01-2026",
      "value": "2026-01-15"
    },
    {
      "name": "01-12-2025",
      "value": "2025-12-01"
    }
  ],
  "operation": "dateNames",
  "button": "Sort day-first",
  "button2": "Use year-first"
} satisfies StudySpec;

export const study_version_nine_and_ten = {
  "family": "files",
  "slug": "version-nine-and-ten",
  "title": "Version 10 after version 9",
  "hook": "Text order and numeric order disagree about 9 and 10.",
  "objective": "Pad numeric version fields before lexicographic sorting.",
  "question": "Which names sort v9 before v10 alphabetically?",
  "options": [
    "v09 and v10",
    "v9 and v10"
  ],
  "answer": 0,
  "principle": "The padded versions have the same width. This fixture demonstrates text sorting; many real file browsers already use natural numeric sorting.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "v9 and v10",
  "items": [
    {
      "name": "v9",
      "value": "09"
    },
    {
      "name": "v10",
      "value": "10"
    },
    {
      "name": "v2",
      "value": "02"
    }
  ],
  "operation": "versions",
  "button": "Sort plain",
  "button2": "Pad versions"
} satisfies StudySpec;

export const study_project_prefix_filenames = {
  "family": "files",
  "slug": "project-prefix-filenames",
  "title": "Add the project to the name",
  "hook": "Three “notes” files need a clue that survives leaving their folders.",
  "objective": "Attach a project identifier to exported filenames.",
  "question": "Which remains identifiable outside its folder?",
  "options": [
    "Project-prefixed name",
    "notes.txt alone"
  ],
  "answer": 0,
  "principle": "A prefix carries the project identifier into the filename. The exercise makes identity visible; it does not estimate search time.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "notes.txt alone",
  "items": [
    {
      "name": "notes.txt",
      "value": "Atlas"
    },
    {
      "name": "notes.txt",
      "value": "Birch"
    },
    {
      "name": "notes.txt",
      "value": "Cedar"
    }
  ],
  "operation": "prefix",
  "button": "Show collisions",
  "button2": "Add prefixes"
} satisfies StudySpec;

export const study_show_the_file_extension = {
  "family": "files",
  "slug": "show-the-file-extension",
  "title": "See the file type",
  "hook": "Two visible names look alike until their extensions appear.",
  "objective": "Expose extension information before distinguishing file formats.",
  "question": "Which field distinguishes these formats?",
  "options": [
    "Extension",
    "Shared base name"
  ],
  "answer": 0,
  "principle": "The base names are identical while the extensions differ. Showing that field supplies the distinguishing information; an extension alone does not verify file contents.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "Shared base name",
  "items": [
    {
      "name": "report.pdf",
      "value": "pdf"
    },
    {
      "name": "report.docx",
      "value": "docx"
    },
    {
      "name": "report.txt",
      "value": "txt"
    }
  ],
  "operation": "extension",
  "button": "Hide extensions",
  "button2": "Show extensions"
} satisfies StudySpec;

export const study_tags_are_not_copies = {
  "family": "files",
  "slug": "tags-are-not-copies",
  "title": "Two tags, one file",
  "hook": "One document belongs to two topics without becoming two copies.",
  "objective": "Distinguish multiple labels from separate document identity.",
  "question": "How many underlying documents have two labels here?",
  "options": [
    "One",
    "Two"
  ],
  "answer": 0,
  "principle": "Both labels point to the same fixture identifier. Multiple category links need not create separate copies with diverging contents.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "Two",
  "items": [
    {
      "name": "doc-1",
      "value": "work"
    },
    {
      "name": "doc-1",
      "value": "study"
    },
    {
      "name": "doc-2",
      "value": "home"
    }
  ],
  "operation": "identity",
  "button": "Count links",
  "button2": "Count identities"
} satisfies StudySpec;

export const study_equal_names_not_equal_files = {
  "family": "files",
  "slug": "equal-names-not-equal-files",
  "title": "Same name, different contents",
  "hook": "Identical filenames do not establish duplicate contents.",
  "objective": "Compare content identifiers instead of only names.",
  "question": "Which comparison distinguishes the two report files?",
  "options": [
    "Content identifier",
    "Filename alone"
  ],
  "answer": 0,
  "principle": "The two report files have different content identifiers. Names can collide; this fixture compares declared content, not a real cryptographic hash.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "Filename alone",
  "items": [
    {
      "name": "report.txt",
      "value": "A"
    },
    {
      "name": "report.txt",
      "value": "B"
    },
    {
      "name": "copy.txt",
      "value": "A"
    }
  ],
  "operation": "duplicates",
  "button": "Group names",
  "button2": "Group content"
} satisfies StudySpec;

export const study_shorter_folder_path = {
  "family": "files",
  "slug": "shorter-folder-path",
  "title": "Flatten one folder level",
  "hook": "A deep folder chain makes every visit traverse more levels.",
  "objective": "Count path segments before and after removing a redundant folder.",
  "question": "Which measures this folder-navigation exercise?",
  "options": [
    "Segments traversed",
    "File size"
  ],
  "answer": 0,
  "principle": "Removing the redundant middle directory reduces the path segment count. This is navigation arithmetic, not a measured speedup or a rule against all deep folders.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "File size",
  "items": [
    {
      "name": "work/old/notes",
      "value": "3"
    },
    {
      "name": "work/old/maps",
      "value": "3"
    },
    {
      "name": "home/docs",
      "value": "2"
    }
  ],
  "operation": "paths",
  "button": "Count levels",
  "button2": "Remove old level"
} satisfies StudySpec;

export const study_size_is_not_recency = {
  "family": "files",
  "slug": "size-is-not-recency",
  "title": "Large is not recent",
  "hook": "Sorting by size answers a different question from sorting by date.",
  "objective": "Choose sorting metadata that matches the retrieval goal.",
  "question": "To find the latest fixture file, which sort fits?",
  "options": [
    "Modified day",
    "Size"
  ],
  "answer": 0,
  "principle": "The size and day fields disagree. Sorting by the field that answers the question is different from choosing the most prominent-looking file.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "Size",
  "items": [
    {
      "name": "movie",
      "value": "90MB d1",
      "size": 90,
      "day": 1
    },
    {
      "name": "notes",
      "value": "2MB d9",
      "size": 2,
      "day": 9
    },
    {
      "name": "slides",
      "value": "8MB d5",
      "size": 8,
      "day": 5
    }
  ],
  "operation": "sort",
  "button": "Sort size",
  "field": "size",
  "field2": "day",
  "button2": "Sort day"
} satisfies StudySpec;

export const study_deleted_is_a_search_state = {
  "family": "files",
  "slug": "deleted-is-a-search-state",
  "title": "Search the missing-file state",
  "hook": "A file absent from the active list may be in the exercise’s trash.",
  "objective": "Distinguish active-only search from including deleted items.",
  "question": "Which search includes the trashed note?",
  "options": [
    "Include trash",
    "Active only"
  ],
  "answer": 0,
  "principle": "The note has a deleted-state flag. Including that state reveals it in this fixture; retention and recovery rules differ across real products.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "Active only",
  "items": [
    {
      "name": "notes",
      "value": "trash",
      "deleted": true
    },
    {
      "name": "map",
      "value": "active",
      "deleted": false
    },
    {
      "name": "draft",
      "value": "active",
      "deleted": false
    }
  ],
  "operation": "trash",
  "button": "Active only",
  "button2": "Include trash"
} satisfies StudySpec;

export const study_search_the_document_body = {
  "family": "files",
  "slug": "search-the-document-body",
  "title": "Search beyond the title",
  "hook": "“Untitled” can contain the exact detail you remember.",
  "objective": "Distinguish title-only search from content search.",
  "question": "Which finds the fixture containing “telescope”?",
  "options": [
    "Body search",
    "Title search"
  ],
  "answer": 0,
  "principle": "The body contains the remembered term while the title does not. Expanding the searched field changes which documents can match.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Drive Help, Search for files in Google Drive, filtering and advanced search; retrieved 2026-10-13: https://support.google.com/drive/answer/2375114?hl=en . Exercise fixtures do not reproduce every Drive search behaviour.",
  "misconception": "Title search",
  "items": [
    {
      "name": "untitled",
      "value": "telescope notes"
    },
    {
      "name": "shopping",
      "value": "bread list"
    },
    {
      "name": "archive",
      "value": "old maps"
    }
  ],
  "operation": "body",
  "button": "Titles only",
  "value": "telescope",
  "button2": "Search bodies"
} satisfies StudySpec;

export const study_mail_or_vs_and = {
  "family": "files",
  "slug": "mail-or-vs-and",
  "title": "Either sender or both fields",
  "hook": "OR broadens a set; AND requires both conditions.",
  "objective": "Distinguish union and intersection in a message filter.",
  "question": "Which includes every match to either condition?",
  "options": [
    "OR",
    "AND"
  ],
  "answer": 0,
  "principle": "OR includes matches from either set. AND keeps only their intersection; this exercise counts individual records, not Gmail conversations.",
  "boundary": "Exercise only; no measured productivity gain.",
  "source": "Google Gmail Help, Refine searches in Gmail, operator table; retrieved 2026-10-13: https://support.google.com/mail/answer/7190?hl=en . Fixture tests explicit fields only, not live Gmail conversation-level behaviour.",
  "misconception": "AND",
  "items": [
    {
      "name": "m1",
      "value": "Ana PDF",
      "owner": "Ana",
      "type": "pdf"
    },
    {
      "name": "m2",
      "value": "Ana TXT",
      "owner": "Ana",
      "type": "txt"
    },
    {
      "name": "m3",
      "value": "Bo PDF",
      "owner": "Bo",
      "type": "pdf"
    },
    {
      "name": "m4",
      "value": "Bo TXT",
      "owner": "Bo",
      "type": "txt"
    }
  ],
  "operation": "boolean",
  "button": "Use OR",
  "field": "owner",
  "value": "Ana",
  "field2": "type",
  "value2": "pdf",
  "button2": "Use AND"
} satisfies StudySpec;

export const study_name_the_next_owner = {
  "family": "message",
  "slug": "name-the-next-owner",
  "title": "Who does the next action?",
  "hook": "“Someone should check it” leaves ownership unresolved.",
  "objective": "Add a named owner and next action to a fixture handoff.",
  "question": "Which note assigns the action?",
  "options": [
    "Named owner and action",
    "Someone should check"
  ],
  "answer": 0,
  "principle": "The note’s declared checklist asks for an owner, an action and an object. Filling those fields removes these specific gaps; it does not guarantee agreement.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Someone should check",
  "labels": [
    "report",
    "owner",
    "action"
  ],
  "words": [
    "report",
    "Mina",
    "review"
  ],
  "fields": [
    "Object",
    "Owner",
    "Action"
  ]
} satisfies StudySpec;

export const study_make_a_question_answerable = {
  "family": "message",
  "slug": "make-a-question-answerable",
  "title": "Bound the question",
  "hook": "“What do you think?” can ask for almost anything.",
  "objective": "Specify the decision and the requested response.",
  "question": "Which request defines the decision being asked for?",
  "options": [
    "Choose A or B",
    "What do you think?"
  ],
  "answer": 0,
  "principle": "The fixture asks for a choice between named alternatives. A bounded response makes the requested decision explicit, while leaving room for objections.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "What do you think?",
  "labels": [
    "proposal",
    "choice",
    "reply"
  ],
  "words": [
    "proposal",
    "A/B",
    "Friday"
  ],
  "fields": [
    "Object",
    "Choice",
    "Reply"
  ]
} satisfies StudySpec;

export const study_deadline_needs_a_reference = {
  "family": "message",
  "slug": "deadline-needs-a-reference",
  "title": "What does “Friday” mean?",
  "hook": "A deadline needs a date and time reference, especially across locations.",
  "objective": "Replace an ambiguous deadline with an explicit dated time zone.",
  "question": "Which deadline is explicit in this fixture?",
  "options": [
    "14 Oct 15:00 UTC",
    "Friday afternoon"
  ],
  "answer": 0,
  "principle": "The date, clock time and time-zone reference define the fixture deadline. Local conversion and daylight-saving rules remain outside this exercise.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Friday afternoon",
  "labels": [
    "date",
    "time",
    "zone"
  ],
  "words": [
    "14Oct",
    "15:00",
    "UTC"
  ],
  "fields": [
    "Date",
    "Time",
    "Zone"
  ]
} satisfies StudySpec;

export const study_agenda_needs_an_outcome = {
  "family": "message",
  "slug": "agenda-needs-an-outcome",
  "title": "Give the meeting an outcome",
  "hook": "Three discussion topics still do not name the decision needed.",
  "objective": "Add a desired outcome and decision owner to an agenda.",
  "question": "Which agenda states the intended result?",
  "options": [
    "Choose plan plus owner",
    "Discuss the plan"
  ],
  "answer": 0,
  "principle": "The agenda’s checklist requires topic, outcome and decision owner. It records what the meeting is meant to produce, not whether the meeting will be effective.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Discuss the plan",
  "labels": [
    "topic",
    "outcome",
    "owner"
  ],
  "words": [
    "plan",
    "choose",
    "Bo"
  ],
  "fields": [
    "Topic",
    "Outcome",
    "Owner"
  ]
} satisfies StudySpec;

export const study_record_the_reason = {
  "family": "message",
  "slug": "record-the-reason",
  "title": "Keep the decision reason",
  "hook": "“We chose B” does not preserve why B was chosen.",
  "objective": "Record choice, constraint and reason together.",
  "question": "Which record allows the rationale to be inspected later?",
  "options": [
    "Choice plus reason",
    "Choice alone"
  ],
  "answer": 0,
  "principle": "The added reason identifies the stated constraint behind the decision. Later readers can inspect that rationale instead of reconstructing it from the chosen option.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Choice alone",
  "labels": [
    "choice",
    "reason",
    "condition"
  ],
  "words": [
    "B",
    "shorter",
    "deadline"
  ],
  "fields": [
    "Choice",
    "Reason",
    "Condition"
  ]
} satisfies StudySpec;

export const study_handoff_needs_a_checkpoint = {
  "family": "message",
  "slug": "handoff-needs-a-checkpoint",
  "title": "Leave a restart point",
  "hook": "A handoff saying “almost done” lacks a place to resume.",
  "objective": "Record the current artifact, completed step and next check.",
  "question": "Which handoff identifies a restart point?",
  "options": [
    "Artifact and next check",
    "Almost done"
  ],
  "answer": 0,
  "principle": "The checklist records artifact, last completed step and next check. It gives a specific restart point while leaving responsibility for verification explicit.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Almost done",
  "labels": [
    "artifact",
    "finished",
    "next"
  ],
  "words": [
    "draft-v2",
    "outline",
    "sources"
  ],
  "fields": [
    "Artifact",
    "Finished",
    "Next"
  ]
} satisfies StudySpec;

export const study_bug_report_needs_reproduction = {
  "family": "message",
  "slug": "bug-report-needs-reproduction",
  "title": "Make the bug reproducible",
  "hook": "“It broke” lacks the input that produced the failure.",
  "objective": "Specify input, expected output and actual output in a bug report.",
  "question": "Which report supports a reproduction attempt?",
  "options": [
    "Input expected actual",
    "It broke"
  ],
  "answer": 0,
  "principle": "The three fields allow a reproduction attempt against the same input. Reproducing a symptom is evidence about that case, not proof of its root cause.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "It broke",
  "labels": [
    "input",
    "expected",
    "actual"
  ],
  "words": [
    "x=2",
    "4",
    "5"
  ],
  "fields": [
    "Input",
    "Expected",
    "Actual"
  ]
} satisfies StudySpec;

export const study_request_needs_the_object = {
  "family": "message",
  "slug": "request-needs-the-object",
  "title": "Point to the exact object",
  "hook": "“Review the document” is ambiguous when three drafts exist.",
  "objective": "Specify artifact version and review scope.",
  "question": "Which request points to one review target?",
  "options": [
    "Version plus scope",
    "The document"
  ],
  "answer": 0,
  "principle": "The named version and scope identify the requested object and inspection. The exercise does not assume the reviewer has permissions or has accepted the request.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "The document",
  "labels": [
    "artifact",
    "version",
    "scope"
  ],
  "words": [
    "report",
    "v3",
    "figures"
  ],
  "fields": [
    "Artifact",
    "Version",
    "Scope"
  ]
} satisfies StudySpec;

export const study_status_and_blocker_differ = {
  "family": "message",
  "slug": "status-and-blocker-differ",
  "title": "Progress is not the blocker",
  "hook": "A status update needs the obstacle and the next unblock action.",
  "objective": "Separate completed work, blocker and next action.",
  "question": "Which update makes the obstacle explicit?",
  "options": [
    "Done blocker next",
    "Busy today"
  ],
  "answer": 0,
  "principle": "The checklist separates work already completed from the obstacle and next action. An activity description alone does not supply those fields.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Busy today",
  "labels": [
    "done",
    "blocker",
    "next"
  ],
  "words": [
    "draft",
    "data",
    "ask-Bo"
  ],
  "fields": [
    "Done",
    "Blocker",
    "Next"
  ]
} satisfies StudySpec;

export const study_link_label_names_the_target = {
  "family": "message",
  "slug": "link-label-names-the-target",
  "title": "Name the link destination",
  "hook": "Three “click here” links hide which artifact each opens.",
  "objective": "Attach a descriptive target label to a fixture link.",
  "question": "Which label names the intended destination?",
  "options": [
    "Report v3 sources",
    "Click here"
  ],
  "answer": 0,
  "principle": "The label states artifact, version and scope. This local example illustrates a descriptive label; it does not verify the real destination or link accessibility.",
  "boundary": "Exercise checklist; no promised communication outcome.",
  "source": "Explicit communication checklist convention in this fixture. No empirical claim about response rates, meeting efficiency or persuasion. Explicit exercise fixture in src/lib/lifehacks/studyCatalog.ts and pure rules in studyModels.ts. All times, sizes, deadlines and outcomes describe this exercise only; no empirical productivity or learning effect is inferred.",
  "misconception": "Click here",
  "labels": [
    "artifact",
    "version",
    "section"
  ],
  "words": [
    "report",
    "v3",
    "sources"
  ],
  "fields": [
    "Artifact",
    "Version",
    "Section"
  ]
} satisfies StudySpec;

export const study_copy_keeps_the_original = {
  "family": "edit",
  "slug": "copy-keeps-the-original",
  "title": "Copy keeps the original",
  "hook": "A copy creates another instance without moving the source.",
  "objective": "Distinguish copy from move using visible source and destination.",
  "question": "What does copy preserve?",
  "options": [
    "Original source",
    "Only destination"
  ],
  "answer": 0,
  "principle": "Copy leaves the source in place and creates destination content. This fixture models that command; operating-system clipboard rules are outside it.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "Only destination",
  "before": [
    "A",
    "B",
    "C"
  ],
  "step1": [
    "A",
    "B",
    "C",
    "B"
  ],
  "step2": [
    "A",
    "B",
    "C",
    "B",
    "B"
  ],
  "button": "Copy B",
  "button2": "Paste again"
} satisfies StudySpec;

export const study_cut_moves_the_selection = {
  "family": "edit",
  "slug": "cut-moves-the-selection",
  "title": "Cut and paste relocate",
  "hook": "Copy and cut agree only if you ignore what happened to the source.",
  "objective": "Move selected content while observing its removal from the original position.",
  "question": "What differs between cut and copy?",
  "options": [
    "Removal from source",
    "The selected letters"
  ],
  "answer": 0,
  "principle": "Cut removes the selection in this fixture and places it at the destination. The visible order lets you inspect relocation instead of just counting copies.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "The selected letters",
  "before": [
    "A",
    "B",
    "C"
  ],
  "step1": [
    "A",
    "C"
  ],
  "step2": [
    "A",
    "C",
    "B"
  ],
  "button": "Cut B",
  "button2": "Paste B"
} satisfies StudySpec;

export const study_undo_then_redo = {
  "family": "edit",
  "slug": "undo-then-redo",
  "title": "Undo the accidental edit",
  "hook": "Undo and redo walk the local edit history in opposite directions.",
  "objective": "Restore a prior local edit and then reapply it.",
  "question": "Which command returns to the prior edit state?",
  "options": [
    "Undo",
    "Redo"
  ],
  "answer": 0,
  "principle": "Undo returns to the previous stored state and redo reapplies that state transition. Apps differ in which operations and histories support these commands.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "Redo",
  "before": [
    "A",
    "X",
    "C"
  ],
  "step1": [
    "A",
    "B",
    "C"
  ],
  "step2": [
    "A",
    "X",
    "C"
  ],
  "button": "Undo edit",
  "button2": "Redo edit"
} satisfies StudySpec;

export const study_select_before_replace = {
  "family": "edit",
  "slug": "select-before-replace",
  "title": "Selection bounds replacement",
  "hook": "Replacing a selection affects that selection, not every matching word.",
  "objective": "Distinguish replacing a selected occurrence from replacing all.",
  "question": "Which limits the edit to the selected occurrence?",
  "options": [
    "Selected replacement",
    "Replace all"
  ],
  "answer": 0,
  "principle": "The first replacement changes only the selected position. Replace-all changes every exact match; inspect that scope before applying a broad edit.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "Replace all",
  "before": [
    "cat",
    "cat",
    "dog"
  ],
  "step1": [
    "fox",
    "cat",
    "dog"
  ],
  "step2": [
    "fox",
    "fox",
    "dog"
  ],
  "button": "Replace selected",
  "button2": "Replace remaining"
} satisfies StudySpec;

export const study_find_next_is_navigation = {
  "family": "edit",
  "slug": "find-next-is-navigation",
  "title": "Find does not edit",
  "hook": "Finding a word changes your location, not the document’s content.",
  "objective": "Distinguish a search highlight from an editing operation.",
  "question": "What does Find change here?",
  "options": [
    "Highlighted match",
    "Stored text"
  ],
  "answer": 0,
  "principle": "Find changes the highlighted match while the tokens stay unchanged. Searching and editing are different operations in this local document fixture.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "Stored text",
  "before": [
    "map",
    "key",
    "map"
  ],
  "step1": [
    "map",
    "key",
    "map"
  ],
  "step2": [
    "map",
    "key",
    "map"
  ],
  "button": "Find first",
  "button2": "Find next"
} satisfies StudySpec;

export const study_plain_text_paste_scope = {
  "family": "edit",
  "slug": "plain-text-paste-scope",
  "title": "Paste words without the style",
  "hook": "A pasted title can bring formatting along with its words.",
  "objective": "Distinguish text content from a simulated style attribute.",
  "question": "What does plain-text paste leave behind here?",
  "options": [
    "Source formatting",
    "The words"
  ],
  "answer": 0,
  "principle": "The first state carries the source style; the second keeps the words with plain styling. Real paste options vary by app, so this exercise models the distinction only.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "The words",
  "before": [
    "Title"
  ],
  "step1": [
    "BOLD",
    "Title"
  ],
  "step2": [
    "plain",
    "Title"
  ],
  "button": "Paste styled",
  "button2": "Paste plain"
} satisfies StudySpec;

export const study_preview_replace_all = {
  "family": "edit",
  "slug": "preview-replace-all",
  "title": "Preview the broad edit",
  "hook": "A broad replacement can change matches you did not mean to touch.",
  "objective": "Inspect every exact-match replacement before applying it.",
  "question": "What should a broad edit preview expose?",
  "options": [
    "All affected matches",
    "Only first match"
  ],
  "answer": 0,
  "principle": "The preview marks every exact match. The applied edit changes each marked token, making its scope inspectable; it does not determine whether the replacement was appropriate.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "Only first match",
  "before": [
    "red",
    "blue",
    "red"
  ],
  "step1": [
    "red",
    "blue",
    "red"
  ],
  "step2": [
    "green",
    "blue",
    "green"
  ],
  "button": "Preview matches",
  "button2": "Apply replacement"
} satisfies StudySpec;

export const study_duplicate_before_experiment = {
  "family": "edit",
  "slug": "duplicate-before-experiment",
  "title": "Experiment on a copy",
  "hook": "A duplicate makes the original state available beside an edited version.",
  "objective": "Distinguish original and duplicate in a local experiment.",
  "question": "Which preserves a separate original here?",
  "options": [
    "Edit a duplicate",
    "Overwrite only original"
  ],
  "answer": 0,
  "principle": "The copy has its own visible identifier. The second operation edits it while preserving the original fixture; a duplicate in one location is not a resilient backup.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "Overwrite only original",
  "before": [
    "original:A"
  ],
  "step1": [
    "original:A",
    "copy:A"
  ],
  "step2": [
    "original:A",
    "copy:B"
  ],
  "button": "Duplicate",
  "button2": "Edit copy"
} satisfies StudySpec;

export const study_zoom_does_not_rewrite = {
  "family": "edit",
  "slug": "zoom-does-not-rewrite",
  "title": "Zoom changes the view",
  "hook": "Larger letters on screen do not add more text to the document.",
  "objective": "Distinguish view magnification from stored content edits.",
  "question": "What remains unchanged when zooming?",
  "options": [
    "Stored text",
    "Screen size of letters"
  ],
  "answer": 0,
  "principle": "The displayed scale changes while the stored tokens remain the same. View magnification and document content are separate state in this exercise.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "Screen size of letters",
  "before": [
    "Map",
    "Key"
  ],
  "step1": [
    "Map",
    "Key"
  ],
  "step2": [
    "Map",
    "Key"
  ],
  "button": "Zoom in",
  "button2": "Zoom out"
} satisfies StudySpec;

export const study_selection_not_focus = {
  "family": "edit",
  "slug": "selection-not-focus",
  "title": "Focus and selection differ",
  "hook": "The active panel and the selected item are separate pieces of state.",
  "objective": "Distinguish choosing a target from bringing a panel into focus.",
  "question": "Which identifies the item the command will affect here?",
  "options": [
    "Selection",
    "Panel focus alone"
  ],
  "answer": 0,
  "principle": "The fixture records focus and selection separately. A command target requires inspecting the selected item; shortcuts and focus behaviour vary between applications.",
  "boundary": "Local command model; app and locale can differ.",
  "source": "Microsoft Learn, Keyboard accelerators, Common Keyboard Accelerators and scope caveats; retrieved 2026-10-13: https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-accelerators . Shortcuts depend on app, platform and locale; this exercise models the command, not a global keyboard binding.",
  "misconception": "Panel focus alone",
  "before": [
    "left:A",
    "right:B"
  ],
  "step1": [
    "left:A",
    "right:B"
  ],
  "step2": [
    "left:A",
    "right:B"
  ],
  "button": "Focus right",
  "button2": "Select B"
} satisfies StudySpec;

export const studyCatalog = {
  "spaced-beats-cram": study_spaced_beats_cram,
  "cover-before-recall": study_cover_before_recall,
  "one-question-one-card": study_one_question_one_card,
  "cue-needs-a-boundary": study_cue_needs_a_boundary,
  "reverse-the-flashcard": study_reverse_the_flashcard,
  "rebuild-the-procedure": study_rebuild_the_procedure,
  "note-gap-check": study_note_gap_check,
  "explain-the-link": study_explain_the_link,
  "apply-not-quote": study_apply_not_quote,
  "separate-confusable-pairs": study_separate_confusable_pairs,
  "check-confidence-with-output": study_check_confidence_with_output,
  "keep-the-error-feedback": study_keep_the_error_feedback,
  "calendar-needs-travel": study_calendar_needs_travel,
  "buffer-for-a-late-finish": study_buffer_for_a_late_finish,
  "work-back-from-a-deadline": study_work_back_from_a_deadline,
  "meeting-and-preparation": study_meeting_and_preparation,
  "estimate-a-range": study_estimate_a_range,
  "one-person-two-jobs": study_one_person_two_jobs,
  "fit-before-fixed-slot": study_fit_before_fixed_slot,
  "include-the-wrap-up": study_include_the_wrap_up,
  "fragmented-time-does-not-fit": study_fragmented_time_does_not_fit,
  "handoff-after-finish": study_handoff_after_finish,
  "count-setup-in-the-block": study_count_setup_in_the_block,
  "arrival-is-not-departure": study_arrival_is_not_departure,
  "reserve-an-unassigned-slot": study_reserve_an_unassigned_slot,
  "short-jobs-clear-a-queue": study_short_jobs_clear_a_queue,
  "earliest-deadline-first": study_earliest_deadline_first,
  "dependency-before-priority": study_dependency_before_priority,
  "batch-by-setup": study_batch_by_setup,
  "unlock-the-following-work": study_unlock_the_following_work,
  "do-not-starve-the-long-job": study_do_not_starve_the_long_job,
  "work-in-process-limit": study_work_in_process_limit,
  "separate-ready-from-blocked": study_separate_ready_from_blocked,
  "delegate-the-whole-handoff": study_delegate_the_whole_handoff,
  "choose-the-metric-first": study_choose_the_metric_first,
  "file-type-then-owner": study_file_type_then_owner,
  "mail-exact-phrase": study_mail_exact_phrase,
  "mail-minus-noise": study_mail_minus_noise,
  "file-modified-not-created": study_file_modified_not_created,
  "iso-date-filename-sort": study_iso_date_filename_sort,
  "version-nine-and-ten": study_version_nine_and_ten,
  "project-prefix-filenames": study_project_prefix_filenames,
  "show-the-file-extension": study_show_the_file_extension,
  "tags-are-not-copies": study_tags_are_not_copies,
  "equal-names-not-equal-files": study_equal_names_not_equal_files,
  "shorter-folder-path": study_shorter_folder_path,
  "size-is-not-recency": study_size_is_not_recency,
  "deleted-is-a-search-state": study_deleted_is_a_search_state,
  "search-the-document-body": study_search_the_document_body,
  "mail-or-vs-and": study_mail_or_vs_and,
  "name-the-next-owner": study_name_the_next_owner,
  "make-a-question-answerable": study_make_a_question_answerable,
  "deadline-needs-a-reference": study_deadline_needs_a_reference,
  "agenda-needs-an-outcome": study_agenda_needs_an_outcome,
  "record-the-reason": study_record_the_reason,
  "handoff-needs-a-checkpoint": study_handoff_needs_a_checkpoint,
  "bug-report-needs-reproduction": study_bug_report_needs_reproduction,
  "request-needs-the-object": study_request_needs_the_object,
  "status-and-blocker-differ": study_status_and_blocker_differ,
  "link-label-names-the-target": study_link_label_names_the_target,
  "copy-keeps-the-original": study_copy_keeps_the_original,
  "cut-moves-the-selection": study_cut_moves_the_selection,
  "undo-then-redo": study_undo_then_redo,
  "select-before-replace": study_select_before_replace,
  "find-next-is-navigation": study_find_next_is_navigation,
  "plain-text-paste-scope": study_plain_text_paste_scope,
  "preview-replace-all": study_preview_replace_all,
  "duplicate-before-experiment": study_duplicate_before_experiment,
  "zoom-does-not-rewrite": study_zoom_does_not_rewrite,
  "selection-not-focus": study_selection_not_focus
} satisfies Record<string, StudySpec>;
