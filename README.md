# Mixed Language Configuration

Sometimes you have projects that use different languages but still need to share configuration values.

I recently worked on a [project](https://github.com/BrainDumpShrinkBot/brain_dump_shrink_bot) where this was the case. The main app was an Express.js web application, but there was a significant component written in Python.

## Concept

Using a common data storage class, write scripts in various languages which will build a configuration object in that language appropriate for the runtime environment.

## Bumps in the road

What is the best means to write out the configuration data?

How can you specify the runtime environment?

How should defaults be specified?

## Prior art

In Rails, YAML files store the vast amount of configuration information (`config/database.yml`, `config/secrets.yml`) and adapt well to the various runtime environments by having sections for each environment.

YAML is independent of Rails, of course, and is used in many other environments. Most languages have a means of reading YAML files and creating an object in the chosen language.

Yet YAML can also be confusing when dealing with more complex data.

INI files, often seen in Windows, but also in other areas, provide a possibly more common way of implementing this scheme, using `[env]` sections.

While INI enjoys a lot of popularity, and many languages implement some means of reading them, there is inconsistency in implementation.

JSON files are often used to hold configuration info, especially in JavaScript applications.

JSON has near-universal appeal as a data-exchange format between applications while remaining human-readable and -writable (noting the other near-universal exchange language is XML...)

## JSON as data format

I'm choosing to use JSON in this implementation.

## Implementation

This is a reference implementation. I'm not proposing this as a library add-on in any sense, but a component to test out my various ideas in dealing with this. I'm hoping to keep the configuration readers simple enough that they can be just copied where needed.

I'm adopting the convention that configuration lies in a directory at the application root called `config`. Config data will be in files corresponding to the runtime environment name plus `.json` as the extension, e.g. `development.json`, `test.json`, `staging.json`, and `production.json`.

Default config info will be in `default.json`.

### confguration collators

Each language's configuration will be implemented within a file called `index` with the extension appropriate to that language:

- `index.js`: Node.js
- `index.py`: Python
- `index.rb`: Ruby
- `index.php`: PHP
- `index.pl`: Perl

### specifying runtime environment

Almost universally, the runtime environment is specified via an environment variable. How these are set is dependent on the OS platform the applicaiton runs on.

Each language / framework / platform has different ways of saying what the given runtime environment is; each of the collators will use one appropriate to the situation:

|----------|----------------------|
| language | environment variable |
|----------|----------------------|
| Node.js  | NODE_ENV             |
| Ruby     | RAILS_ENV, RACK_ENV  |
| Python   | ??                   |
| PHP      | ??                   |
| Perl     | ??                   |
|----------|----------------------|

(**NOTE:** still have to figure out what the envvars in the other languages are.)


