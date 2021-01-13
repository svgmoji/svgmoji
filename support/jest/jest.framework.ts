// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../globals.d.ts" />

// Extended the available expect assertions.
import 'jest-extended';

import diffHtml from 'diffable-html';
import { getSnapshotDiffSerializer, toMatchDiffSnapshot } from 'snapshot-diff';

// Add enhanced snapshot capabilities.
expect.addSnapshotSerializer(getSnapshotDiffSerializer());
expect.extend({ toMatchDiffSnapshot });

/**
 * This is here to make `unhandledRejection` errors easier to debug
 */
process.on('unhandledRejection', (reason) => {
  console.error('REJECTION', reason);
});

/**
 * Add a jest serializer for HTML content. Checks if the snapshot begins with `<` and assumes html.
 */
expect.addSnapshotSerializer({
  test: (object) => {
    if (typeof object !== 'string') {
      return false;
    }

    const trimmed = object.trim();
    return trimmed.length > 2 && trimmed.startsWith('<') && trimmed.endsWith('>');
  },
  serialize: (val: string) => {
    return diffHtml(val).trim();
  },
});
