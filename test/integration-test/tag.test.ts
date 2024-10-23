import path from 'path';

import express from 'express';

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import {
  GenericContainer,
  Network,
  StartedNetwork,
  StartedTestContainer,
} from 'testcontainers';

const app = express();

describe('application', () => {
  let mongoDblContainer: StartedTestContainer;
  let apiContainer: StartedTestContainer;
  let network: StartedNetwork;
  let apiUrl: string;

  before(async () => {
    network = await new Network().start();

    const mongoDblContainer = await new GenericContainer('mongo:6.0.4')
      .withExposedPorts(27017)
      .withName('test_mongodb')
      .withNetworkMode(network.getName())
      .start();

    apiContainer = await new GenericContainer('node:20:alpine')
      .withExposedPorts(8080)
      .withEnvironment({
        PORT: '8080',
        MONGODB_URL: mongoDblContainer.getHost(),
        DB_NAME: 'test',
      })
      .start();

    const apiLogs = await apiContainer.logs();
    apiLogs.on('data', line => console.log(line));
    apiLogs.on('err', line => console.error(line));

    apiUrl = `http://${apiContainer.getHost()}:${apiContainer.getMappedPort(8080)}`;
  });

  test('addTag', async () => {
    const response = await request(apiUrl)
      .post('/tag')
      .set('Content-Type', 'application/json')
      .send({
        key: 'test',
      });

    assert.equal(response.status, 200);
  });

  test('getAllTags', async () => {
    const response = await request(apiUrl)
      .get('/tag')
      .set('Content-Type', 'application/json');

    assert.equal(response.status, 200);
    assert.equal(response.body.tags.length, 1);
  });

  after(async () => {
    await mongoDblContainer.stop();
    await apiContainer.stop();
    await network.stop();
  });
});
