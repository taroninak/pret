# Pret

**Pret** is a simple human language translation package for [Node.js](https://nodejs.org).

It can be used either as a translation module in any Node.js program or as a standalone command line translation tool. It supports not only single word translation but also butch mode which provides word by word translation. For now it uses [Collins Cobuild](http://www.collins.co.uk/product/9780007580583/Collins+COBUILD+Advanced+Learner%E2%80%99s+Dictionary+%5BEighth+edition%5D) explanatory dictionary which of course not translation dictionary, therefore, Pret returns word explanation. Other dsl dictionaries can be added manually.

## Usage
### Single word mode
```javascript
const pret = require('pret');

cosole.log(pret.translate('help'));    
```

### Batch mode
```javascript
const pret = require('pret');
var text = 'There is no word which is impossible to explain.'
cosole.log(pret.translateBatch(text));
```

## CLI Examples

as simple command
```bash
pret saw
```

```saw
[sɔ͟ː]
saws, sawing, sawed, sawn
1) Saw is the past tense of see.
2) N-COUNT A saw is a tool for cutting wood, which has a blade with sharp
teeth along one edge. Some saws are pushed backwards and forwards by hand,
and others are powered by electricity.
→ See also chain saw
3) VERB If you saw something, you cut it with a saw.
[V prep/adv] He escaped by sawing through the bars of his cell...
[V n] Your father is sawing wood.

```
or as a pipe
```bash
echo 'saw mock' | pret
```
```
saw
[sɔ͟ː]
saws, sawing, sawed, sawn
1) Saw is the past tense of see.
2) N-COUNT A saw is a tool for cutting wood, which has a blade with sharp
teeth along one edge. Some saws are pushed backwards and forwards by hand,
and others are powered by electricity.
→ See also chain saw
3) VERB If you saw something, you cut it with a saw.
[V prep/adv] He escaped by sawing through the bars of his cell...
[V n] Your father is sawing wood.

mock
[mɒ̱k]

mocks, mocking, mocked
1) VERB If someone mocks you, they show or pretend that they think you are
foolish or inferior, for example by saying something funny about you, or
by imitating your behaviour.
[V n] I thought you were mocking me...
[V n] I distinctly remember mocking the idea...
[V with quote] `I'm astonished, Benjamin,' she mocked.
2) ADJ: ADJ n You use mock to describe something which is not real or
genuine, but which is intended to be very similar to the real thing.
`It's tragic!' swoons Jeffrey in mock horror...
One of them was subjected to a mock execution.
...a mock Tudor mansion.
3) N-COUNT: usu pl Mocks are practice exams that you take as part of your
preparation for real exams. [BRIT, INFORMAL]
She went from a D in her mocks to a B in the real thing.

```

## API
### Retrive translation for single word
```javascript
pret.translate('word');
```
### Retrive translation for many words
```javascript
pret.translateBatch('word help go');
pret.translateBatch(['word', 'help', 'go']);
```
### Set other dictionary
```javascript
const fs = require('fs');
var dict = fs.readFileSync('./OxfordEnglish.dsl', 'UTF8');
pret.setDictionary(dict);
```

### Get current dictionary
```javascript
var dict = pret.getDictionary();
```
