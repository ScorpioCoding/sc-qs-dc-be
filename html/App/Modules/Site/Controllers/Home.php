<?php

namespace App\Modules\Site\Controllers;

use App\Core\Controller;
use App\Core\View;


/**
 *  Home
 */
class Home extends Controller
{
  protected function before()
  {
  }

  public function indexAction($args = array())
  {
    //echo "here - home controller";
    $meta = array();
    $trans = array();
    $data = array();

    $viewPath = PATH_MODULES;
    $viewPath .= 'Site/Views';

    $viewTemplatePath = PATH_MODULES;
    $viewTemplatePath .= 'Site/Views/temp';

    $viewName = $viewPath . DS;
    $viewName .= strtolower($args['controller']);


    /*
    * render the view
    * @params int 		$renderOption  (1, 2, 3)
    * @params string 	$path
    * @params string 	$name
    * @params array 	$data
    * @params array 	$trans
    *
    * render options are
    *   1 - no includes
    *   2 - include header and footer
    *   3 - include header, navigation and footer
    */
    View::render(2, $viewTemplatePath, $viewName, $meta, $trans, $data);
  }

  protected function after()
  {
  }

  //END-Class
}