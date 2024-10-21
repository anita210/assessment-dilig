import { AppError } from './app.error';
import { list } from './commands';
import { Store } from './stores/store.type';
import { RecipeType } from './recipe';

type Command = (store: Store<RecipeType[]>, args: string[]) => Promise<void>

export async function createApp(store: Store<RecipeType[]>, args: string[],) {
  const [, , command, ...restArgs] = args;

  const commands: Record<string, Command> = {
    'list': list
  }

  if (command in commands) {
    const commandFunction : Command = commands[command]
    try {
      await commandFunction(store, restArgs);
    }
    catch (err) {
      if (err instanceof AppError) {
        console.error(err.message);
      }
      else {
        console.error(err)
      }
    }
  }
}