# Studio 1Way — Coding Philosophy

Code is read more often than it's written — usually by me,
later, having forgotten what I was doing. So code should be
well organized and self explanatory.

Code is a means to an end, so these are principles to guide
not rules that can't be broken. If something can be faster
or done faster, exceptions should be made with intention.

## Functions over classes

Prefer immutable to mutable.

Reach for simple functions first. A function takes data in,
returns data out, and can be understood and tested on its
own.

Classes are also useful but are too easily overcomplicated
with shared mutable state, which can make systems harder to
to reason about.

## One job, done simply

Every function, component, and module does one thing, and its
name says what that thing is. If describing it needs an "and,"
it should probably be two things.

Simple beats clever. Flat beats nested. The boring solution a
stranger can follow beats the elegant one only I can.

## Small public surfaces

Private by default.

A public API is a promise. Keep it minimal: few entry points,
obvious names, no surprises. Internals can change more freely,
the surface shouldn't have to.

## Tests are the spec

Every public API should have unit tests.

Tests document what the system does, in sentences. Read down
the test names and you should be able to understand exactly
how to use it. Frameworks like Ruby's RSpec make it hard not to
do this, most test framework make it easy not to, but all support
this style of testing.

This will encourage simple and easy to use public APIs and leave
tests that are more resilient to change. Unit test everything, 
end to end / integration test only a handful of things. Brittle
tests are more cost than benefit.

## Types and names over comments

Annotate types. Name things precisely. Let the code carry the
meaning, and comment as little as possible. The goal is to need
no comments at all (except docstrings).

## Fail loudly and specifically

Errors are part of the design. Raise specific, typed failures
and handle them at the boundary, where a person can be told
something useful. A vague error helps no one at 2 AM.

## Solve for the problem you have

Think ahead about what you might need next, and write in ways
that facilitate growth. But don't solve a problem you don't have
yet. The world changes fast and you may never actually have it.
More often, you'll have a different more critical problem first.

Complexity is the enemy of quick simple changes, and general
futureproofing usually bites harder with it than whatever comes
in the future.

## In a big codebase, minimize blast radius

Despite all efforts, systems will be imperfect. Or at least
they'll be complicated and hard to understand quickly. Its easy
to break something on accident not covered or possible to cover
with automated tests. Be thoughtful to add changes in ways that
dont threaten existing functionality.

Use shared libraries before inventing something new.

Refactors should happen but they should happen with intent.

First make sure all existing behavior is tested and captured.
Then change and ensure tests continue to pass.
