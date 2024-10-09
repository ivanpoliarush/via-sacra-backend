type Task = () => Promise<any>;

export class Queue {
  private tasks: Task[] = [];

  async run(tasks: Task[]) {
    this.tasks = tasks;
    const results = await this.runTask();

    return results;
  }

  async runTask() {
    const task = this.tasks.shift();
    if (!task) {
      return [];
    }

    const result = await task();
    return [result, ...(await this.runTask())];
  }
}
