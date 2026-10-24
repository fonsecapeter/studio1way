# Studio 1Way — Coding Philosophy

Code is read far more often than it is written — usually by me,
later, having forgotten all of this. So the first rule is that
code should explain itself.

## Functions over classes

I reach for simple functions first. A function takes data in,
returns data out, and can be understood — and tested — on its
own. Classes earn their place only when the language or the
framework leaves no choice: an exception, an error boundary.

What I'm avoiding is shared mutable state. It makes code hard
to reason about, because anything can change anything. Data is
immutable by default; state lives in as few places as possible
and changes in obvious ways.

## One job, done simply

Every function, component, and module does one thing, and its
name says what that thing is. If describing it needs an "and,"
it should probably be two things.

Simple beats clever. Flat beats nested. The boring solution a
stranger can follow beats the elegant one only I can.

## Small public surfaces

A public API is a promise. Keep it minimal: few entry points,
obvious names, no surprises. Internals can change whenever;
the surface shouldn't have to. Most of a system should be
private by default.

## Tests are the spec

Tests document what the system does, in sentences. Read down
the test names and you should be able to reconstruct the
behavior — that's the RSpec lesson I never gave up. Test
behavior, not implementation, so the insides can change without
the spec lying.

## Types and names over comments

Annotate types. Name things precisely. Let the code carry the
meaning, and save comments for the why: the constraint or the
surprise the code itself can't show.

## Fail loudly and specifically

Errors are part of the design. Raise specific, typed failures
and handle them at the boundary, where a person can be told
something useful. A vague error helps no one at 2 AM.

## Principles, not laws

All of this is the standard I aspire to — not rules that can
never bend. A real-world benefit or a deadline can justify an
exception, and shipping the pragmatic thing is sometimes just
right. But the exception should be a conscious choice, made
knowing what it costs, not the default because it was easier
to type. Deviate on purpose; come back to the standard.
