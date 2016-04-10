import test from 'ava';
import 'babel-core/register';
import {filter, validate} from '../lib';
import omit from 'lodash.omit';

test('empty array', t => {
  t.truthy(validate([]));
});

test('facebook post embed', t => {
  const input = [{
    type: 'embed',
    embedType: 'facebook',
    embedAs: 'post',
    url: 'https://www.facebook.com/david.bjorklund/posts/10153809692501070'
  }];
  const expected = input;
  const actual = filter(input);
  const valid = validate(input);

  t.deepEqual(actual, expected);
  t.truthy(valid);
});

test('facebook post embed, check required', t => {
  const input = [{
    type: 'embed',
    embedType: 'facebook',
    embedAs: 'post',
    url: 'https://www.facebook.com/david.bjorklund/posts/10153809692501070'
  }];

  ['type', 'embedType', 'embedAs', 'url'].forEach(key => {
    const obj = omit(input, [key]);
    const valid = validate(obj);
    t.falsy(valid);
  });
});

test('facebook post embed, extra properties', t => {
  const input = [{
    type: 'embed',
    embedType: 'facebook',
    embedAs: 'post',
    url: 'https://www.facebook.com/david.bjorklund/posts/10153809692501070',
    extra: true
  }];
  const expected = input;
  const actual = filter(input);
  const valid = validate(input);

  t.deepEqual(actual, expected);
  t.truthy(valid);
});

test('facebook video embed', t => {
  const input = [{
    type: 'embed',
    embedType: 'facebook',
    embedAs: 'video',
    url: 'https://www.facebook.com/MicMedia/videos/1060315987324524'
  }];

  const expected = input;
  const actual = filter(input);
  const valid = validate(input);

  t.deepEqual(actual, expected);
  t.truthy(valid);
});

test('facebook video embed, check required', t => {
  const input = [{
    type: 'embed',
    embedType: 'facebook',
    embedAs: 'video',
    url: 'https://www.facebook.com/MicMedia/videos/1060315987324524'
  }];

  ['type', 'embedType', 'embedAs', 'url'].forEach(key => {
    const obj = omit(input, [key]);
    const valid = validate(obj);
    t.falsy(valid);
  });
});

test('facebook unknown embed', t => {
  const input = [{
    type: 'embed',
    embedType: 'facebook',
    embedAs: 'unknown',
    url: 'https://www.facebook.com/MicMedia/videos/1060315987324524'
  }];

  const expected = [];
  const valid = validate(input);

  t.falsy(valid);
});
