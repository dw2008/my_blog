import { Octokit } from '@octokit/rest';

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const REPO_CONFIG = {
  owner: process.env.GITHUB_OWNER!,
  repo: process.env.GITHUB_REPO!,
  branch: process.env.GITHUB_BRANCH || 'main',
};

export async function getFile(path: string) {
  try {
    const response = await octokit.repos.getContent({
      owner: REPO_CONFIG.owner,
      repo: REPO_CONFIG.repo,
      path,
      ref: REPO_CONFIG.branch,
    });

    if ('content' in response.data && response.data.type === 'file') {
      return {
        content: Buffer.from(response.data.content, 'base64').toString('utf-8'),
        sha: response.data.sha,
      };
    }

    return null;
  } catch (error: any) {
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function listFiles(path: string) {
  try {
    const response = await octokit.repos.getContent({
      owner: REPO_CONFIG.owner,
      repo: REPO_CONFIG.repo,
      path,
      ref: REPO_CONFIG.branch,
    });

    if (Array.isArray(response.data)) {
      return response.data.filter(item => item.type === 'file' && item.name.endsWith('.md'));
    }

    return [];
  } catch (error: any) {
    if (error.status === 404) {
      return [];
    }
    throw error;
  }
}

export async function createOrUpdateFile(
  path: string,
  content: string,
  message: string,
  sha?: string
) {
  return await octokit.repos.createOrUpdateFileContents({
    owner: REPO_CONFIG.owner,
    repo: REPO_CONFIG.repo,
    path,
    message,
    content: Buffer.from(content).toString('base64'),
    branch: REPO_CONFIG.branch,
    ...(sha && { sha }),
  });
}

export async function deleteFile(path: string, message: string, sha: string) {
  return await octokit.repos.deleteFile({
    owner: REPO_CONFIG.owner,
    repo: REPO_CONFIG.repo,
    path,
    message,
    sha,
    branch: REPO_CONFIG.branch,
  });
}
