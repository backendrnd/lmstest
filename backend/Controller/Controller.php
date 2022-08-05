<?php

namespace Lms\Controller;

use Lms\Helpers\Response;

class Controller {
    /**
     * This method is invoked right before an action is executed.
     *
     * @return bool whether the action should continue to run.
     */
    public function beforeAction() : bool
    {
        return true;
    }

    private function notFoundHandler()
    {
        Response::send(405, "Method Not Allowed");
    }

    public function action(string $id) {
        $methodName = 'action' . str_replace(' ', '', ucwords(str_replace('-', ' ', $id)));
        if (method_exists($this, $methodName)) {
            $method = new \ReflectionMethod($this, $methodName);
            if ($method->isPublic()) {
                if ($this->beforeAction()) {
                    $this->$methodName();
                }
            } else {
                $this->notFoundHandler();;
            }
        } else {
            $this->notFoundHandler();;
        }
    }
}