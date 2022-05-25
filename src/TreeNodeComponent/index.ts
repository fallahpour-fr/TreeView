import { View } from "./view";
import { useContainer } from "./container";
import { IModel } from "./model";

export const TreeNode = () => {
    
    let binding_data = {} as IModel;

    binding_data = useContainer();

    return View(binding_data)
}