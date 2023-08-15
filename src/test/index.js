'use strict';

const assert = require('node:assert');
const { describe, it, beforeEach } = require('node:test');

const PythonLikeEvent = require('../index');

describe('PythonLikeEvent', () => {
    /** @type {PythonLikeEvent} */
    let event;

    beforeEach(() => {
        event = new PythonLikeEvent();
    });

    it('should initially be unset', () => {
        assert.strictEqual(event.isSet(), false);
    });

    it('should set the event flag', () => {
        event.set();
        assert.strictEqual(event.isSet(), true);
    });

    it('should clear the event flag', () => {
        event.set();
        event.clear();
        assert.strictEqual(event.isSet(), false);
    });

    it('should resolve immediately if already set', async () => {
        event.set();
        const result = await event.wait();
        assert.strictEqual(result, true);
    });

    it('should resolve after set', async () => {
        setTimeout(() => {
            event.set();
        }, 1000);

        const result = await event.wait();
        assert.strictEqual(result, true);
    });

    it('should resolve after set within timeout', async () => {
        setTimeout(() => {
            event.set();
        }, 500);

        const result = await event.wait(1000);
        assert.strictEqual(result, true);
    });

    it('should not resolve after timeout without set', async () => {
        const result = await event.wait(1000);
        assert.strictEqual(result, false);
    });

    it('should resolve with set after timeout', async () => {
        setTimeout(() => {
            event.set();
        }, 500);

        const result = await event.wait(1000);
        assert.strictEqual(result, true);
    });
});